class Flow {
    constructor() {
        this.bucket = [1, 2, 3, 4];
        this.currentDealer = undefined;
        this.currentTurn = undefined;
    }
    nextDealer() {
        if (this.currentDealer === this.bucket.length || !this.currentDealer) {
            this.currentDealer = 0;
        }
        return this.bucket[this.currentDealer++]
    }
    nextTurn() {
        if (this.currentTurn === this.bucket.length || !this.currentTurn) {
            this.currentTurn = 0;
        }
        return this.bucket[this.currentTurn++]
    }
}

module.exports = Flow
