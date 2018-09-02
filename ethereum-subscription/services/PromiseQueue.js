class PromiseQueue {
    constructor(promises = [], concurrentCount = 1){
        this.concurrent = concurrentCount;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }

    get runAnother(){
        return (this.running.length < this.concurrent) && (this.todo.length > 0);
    }

    async run(){
        while(this.runAnother){
            const promise = this.todo.shift();
            this.running.push(promise);
            promise.then(() => this.complete.push(this.running.shift()));
        }
    }
}

export default PromiseQueue;