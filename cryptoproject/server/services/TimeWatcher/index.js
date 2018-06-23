'use strict';

function TimeWatcher(timeObjects, notify){
    this.objectsToWatch = timeObjects.filter(object => object.time > Date.now());
    this.timer = false;

    this.watch = () => {
        this.timer = setInterval(() => {
            this.objectsToWatch = this.objectsToWatch.filter((object) => {
                if(object.time <= Date.now()){
                    notify(object);
                    return false;
                }

                return true;
            });

            if(this.objectsToWatch.length === 0){
                this.stopWatching();
            }
        }, 1000);
    };

    this.isWatching = () => {
        return this.timer !== false;
    };

    this.stopWatching = () => {
        if(this.isWatching()){
            clearInterval(this.timer);
            this.timer = false;
        }
    };
}

module.exports = TimeWatcher;