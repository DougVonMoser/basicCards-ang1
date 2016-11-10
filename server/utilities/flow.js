class Flow {
    constructor() {
        this.bucket = [1, 2, 3, 4];
        this.current = 0;
    }
    next() {
        if (this.current === this.bucket.length) {
            this.current = 0;
        }
        return this.bucket[this.current++]
    }
    setAfter(player) {
        if (player === 4) {
            player = 0;
        }
        this.current = player++
    }
}

module.exports = Flow
