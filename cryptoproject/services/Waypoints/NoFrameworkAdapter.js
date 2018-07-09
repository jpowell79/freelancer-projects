function isWindow(element) {
    return element === element.window
}

function getWindow(element) {
    if (isWindow(element)) {
        return element
    }
    return element.defaultView
}

class NoFrameworkAdapter {
    static Waypoint;

    constructor(element){
        NoFrameworkAdapter.Waypoint = window.Waypoint;

        this.element = element;
        this.handlers = {};

        this.scrollTop = this.scrollTop.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.innerHeight = this.innerHeight.bind(this);
        this.innerWidth = this.innerWidth.bind(this);
        this.outerHeight = this.outerHeight.bind(this);
        this.outerWidth = this.outerWidth.bind(this);
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.offset = this.offset.bind(this);
    }

    static isEmptyObject(obj){
        for(let name in obj){
            return false;
        }

        return true;
    };

    static extend(){
        let args = Array.prototype.slice.call(arguments);

        function merge(target, obj) {
            if (typeof target === 'object' && typeof obj === 'object') {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        target[key] = obj[key];
                    }
                }
            }

            return target;
        }

        for (let i = 1, end = args.length; i < end; i++) {
            merge(args[0], args[i]);
        }

        return args[0];
    }

    static inArray(element, array, i) {
        return array == null ? -1 : array.indexOf(element, i);
    };

    innerHeight(){
        let isWin = isWindow(this.element);
        return isWin ? this.element.innerHeight : this.element.clientHeight;
    }

    innerWidth(){
        let isWin = isWindow(this.element);
        return isWin ? this.element.innerWidth : this.element.clientWidth;
    }

    outerHeight(includeMargin){
        let height = this.innerHeight();
        let computedStyle;

        if (includeMargin && !isWindow(this.element)) {
            computedStyle = window.getComputedStyle(this.element);
            height += parseInt(computedStyle.marginTop, 10);
            height += parseInt(computedStyle.marginBottom, 10);
        }

        return height;
    }

    outerWidth(includeMargin){
        let width = this.innerWidth();
        let computedStyle;

        if (includeMargin && !isWindow(this.element)) {
            computedStyle = window.getComputedStyle(this.element);
            width += parseInt(computedStyle.marginLeft, 10);
            width += parseInt(computedStyle.marginRight, 10);
        }

        return width;
    }

    on(event, handler){
        let eventParts = event.split('.');
        let eventType = eventParts[0];
        let namespace = eventParts[1] || '__default';
        let nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {};
        let nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || [];

        nsTypeList.push(handler);
        this.element.addEventListener(eventType, handler);
    }

    off(event, handler){
        function removeListeners(element, listeners, handler) {
            for (let i = 0, end = listeners.length - 1; i < end; i++) {
                let listener = listeners[i];
                if (!handler || handler === listener) {
                    element.removeEventListener(listener);
                }
            }
        }

        let eventParts = event.split('.');
        let eventType = eventParts[0];
        let namespace = eventParts[1];
        let element = this.element;

        if (namespace && this.handlers[namespace] && eventType) {
            removeListeners(element, this.handlers[namespace][eventType], handler);
            this.handlers[namespace][eventType] = [];
        }
        else if (eventType) {
            for (let ns in this.handlers) {
                removeListeners(element, this.handlers[ns][eventType] || [], handler);
                this.handlers[ns][eventType] = [];
            }
        }
        else if (namespace && this.handlers[namespace]) {
            for (let type in this.handlers[namespace]) {
                removeListeners(element, this.handlers[namespace][type], handler);
            }
            this.handlers[namespace] = {};
        }
    };

    scrollTop(){
        let win = getWindow(this.element);
        return win ? win.pageYOffset : this.element.scrollTop;
    }

    scrollLeft(){
        let win = getWindow(this.element);
        return win ? win.pageXOffset : this.element.scrollLeft;
    }

    offset(){
        if (!this.element.ownerDocument) {
            return null;
        }

        let documentElement = this.element.ownerDocument.documentElement;
        let win = getWindow(this.element.ownerDocument);
        let rect = {
            top: 0,
            left: 0
        };

        if (this.element.getBoundingClientRect) {
            rect = this.element.getBoundingClientRect();
        }

        return {
            top: rect.top + win.pageYOffset - documentElement.clientTop,
            left: rect.left + win.pageXOffset - documentElement.clientLeft
        };
    }
}

export default NoFrameworkAdapter;
