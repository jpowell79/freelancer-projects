let groups = {
    vertical: {},
    horizontal: {}
};

function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint;
}

function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint;
}

class Group {
    static Waypoint;

    constructor(options){
        Group.Waypoint = window.Waypoint;

        this.name = options.name;
        this.axis = options.axis;
        this.id = this.name + '-' + this.axis;
        this.waypoints = [];
        this.clearTriggerQueues();
        groups[this.axis][this.name] = this;

        this.add = this.add.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
        this.clearTriggerQueues = this.clearTriggerQueues.bind(this);
        this.flushTriggers = this.flushTriggers.bind(this);
        this.previous = this.previous.bind(this);
        this.queueTrigger = this.queueTrigger.bind(this);
        this.remove = this.remove.bind(this);
        this.first = this.first.bind(this);
    }

    add(waypoint){
        this.waypoints.push(waypoint);
    }

    clearTriggerQueues(){
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        };
    }

    flushTriggers(){
        for (let direction in this.triggerQueues) {
            let waypoints = this.triggerQueues[direction];
            let reverse = direction === 'up' || direction === 'left';
            waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
            for (let i = 0, end = waypoints.length; i < end; i += 1) {
                let waypoint = waypoints[i];
                if (waypoint.options.continuous || i === waypoints.length - 1) {
                    waypoint.trigger([direction]);
                }
            }
        }

        this.clearTriggerQueues();
    }

    next(waypoint){
        this.waypoints.sort(byTriggerPoint);
        let index = Group.Waypoint.Adapter.inArray(waypoint, this.waypoints);
        let isLast = index === this.waypoints.length - 1;

        return isLast ? null : this.waypoints[index + 1];
    }

    previous(waypoint){
        this.waypoints.sort(byTriggerPoint);
        let index = Group.Waypoint.Adapter.inArray(waypoint, this.waypoints);
        return index ? this.waypoints[index - 1] : null;
    }

    queueTrigger(waypoint, direction){
        this.triggerQueues[direction].push(waypoint);
    }

    remove(waypoint){
        let index = Group.Waypoint.Adapter.inArray(waypoint, this.waypoints);
        if (index > -1) {
            this.waypoints.splice(index, 1)
        }
    }

    first(){
        return this.waypoints[0];
    }

    last(){
        return this.waypoints[this.waypoints.length - 1];
    }

    static findOrCreate(options){
        return groups[options.axis][options.name] || new Group(options);
    }
}

export default Group;