import {isClient} from "../utils";
import Context from './Context';
import Group from './Group';
import NoFrameworkAdapter from './NoFrameworkAdapter';

/**
 * A rewrite of the 4.0.1 Waypoints package to work nicer with server
 * rendering tools.
 *
 * Original project:
 * https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
 */
class Waypoint {
    static keyCounter = 0;
    static allWaypoints = {};
    static adapters = [];
    static defaults = {
        context: (isClient()) ? window : null,
        continuous: true,
        enabled: true,
        group: 'default',
        horizontal: false,
        offset: 0
    };
    static offsetAliases = {
        'bottom-in-view': function(){
            return this.context.innerHeight() - this.adapter.outerHeight();
        },
        'right-in-view': function(){
            return this.context.innerWidth() - this.adapter.outerWidth();
        }
    };

    constructor(options){
        if (!options) {
            throw new Error('No options passed to Waypoint constructor')
        }
        if (!options.element) {
            throw new Error('No element option passed to Waypoint constructor')
        }
        if (!options.handler) {
            throw new Error('No handler option passed to Waypoint constructor')
        }

        window.Waypoint = Waypoint;

        Waypoint.requestAnimationFrame = function(callback) {
            let requestFn = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                Waypoint.requestAnimationFrameShim;
            requestFn.call(window, callback)
        };

        Waypoint.Context = Context;
        Waypoint.Group = Group;
        Waypoint.Adapter = NoFrameworkAdapter;
        Waypoint.adapters.push({
            name: 'noframework',
            Adapter: NoFrameworkAdapter
        });

        this.key = 'waypoint-' + Waypoint.keyCounter;
        this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options);
        this.element = this.options.element;
        this.adapter = new Waypoint.Adapter(this.element);
        this.callback = options.handler;
        this.axis = this.options.horizontal ? 'horizontal' : 'vertical';
        this.enabled = this.options.enabled;
        this.triggerPoint = null;
        this.group = Waypoint.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        });
        this.context = Waypoint.Context.findOrCreateByElement(this.options.context);

        if (Waypoint.offsetAliases[this.options.offset]) {
            this.options.offset = Waypoint.offsetAliases[this.options.offset]
        }
        this.group.add(this);
        this.context.add(this);
        Waypoint.allWaypoints[this.key] = this;
        Waypoint.keyCounter += 1;

        this.queueTrigger = this.queueTrigger.bind(this);
        this.trigger = this.trigger.bind(this);
        this.destroy = this.destroy.bind(this);
        this.disable = this.disable.bind(this);
        this.enable = this.enable.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    queueTrigger(direction){
        this.group.queueTrigger(this, direction)
    }

    trigger(args){
        if(!this.enabled){
            return;
        }

        if(this.callback){
            this.callback.apply(this, args);
        }
    }

    destroy(){
        this.context.remove(this);
        this.group.remove(this);

        delete Waypoint.allWaypoints[this.key];
    }

    disable(){
        this.enabled = false;

        return this;
    }

    enable(){
        this.context.refresh();
        this.enabled = true;

        return this;
    }

    next(){
        return this.group.next(this);
    }

    previous(){
        return this.group.previous(this);
    }

    static requestAnimationFrameShim(callback){
        window.setTimeout(callback, 1000 / 60);
    }

    static viewportHeight(){
        return window.innerHeight || document.documentElement.clientHeight;
    }

    static viewportWidth(){
        return document.documentElement.clientWidth;
    }

    static disableAll(){
        Waypoint.invokeAll('disable');
    }

    static enableAll(){
        Waypoint.Context.refreshAll();

        Object.keys(Waypoint.allWaypoints).forEach(key => {
            Waypoint.allWaypoints[key].enabled = true;
        });

        return this;
    }

    static destroyAll(){
        Waypoint.invokeAll('destroy');
    }

    static invokeAll(method){
        let allWaypointsArray = [];

        Object.keys(Waypoint.allWaypoints).forEach(key => {
            allWaypointsArray.push(allWaypoints[key]);
        });

        for (let i = 0, end = allWaypointsArray.length; i < end; i++){
            allWaypointsArray[i][method]();
        }
    }

    static refreshAll(){
        Waypoint.Context.refreshAll();
    }
}

export default Waypoint;