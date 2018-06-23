'use strict';

function TimeWatcher(times, notify){
    this.timesToWatch = times.filter(time => time > Date.now());
    this.timer = false;

    this.watch = () => {
        this.timer = setInterval(() => {
            this.timesToWatch = this.timesToWatch.filter((time) => {
                if(time <= Date.now()){
                    notify(time);
                    return false;
                }

                return true;
            });

            if(this.timesToWatch.length === 0){
                clearInterval(this.timer);
                this.timer = false;
            }
        }, 1000);
    };

    this.isWatching = () => {
        return this.timer !== false;
    };

    this.stopWatching = () => {
        if(this.isWatching()){
            clearInterval(this.timer);
        }
    };
}

module.exports = TimeWatcher;