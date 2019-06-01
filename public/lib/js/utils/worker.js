
class Job {
    constructor(size, callback) {
        this.size = size;
        this.completed = 0;
        this.callback = callback;
    }
    completeTask() {
        if (this.completed === this.size)
            return;
        this.completed += 1;
        if (this.completed === this.size) {
            if (this.callback !== undefined) {
                this.callback()
            }
        }
    }
}

export let newJob = (size, callback) => {
    return new Job(size, callback);
};

