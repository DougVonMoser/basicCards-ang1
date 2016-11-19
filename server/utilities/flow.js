class Flow {
    constructor() {
        this.bucket = [1, 2, 3, 4];
        this.current = 1;
        this.first = true
    }
    next() {
        if (this.first) {
            this.first = false;
            return this.bucket[0]
        }
        if (this.current === this.bucket.length) {
            this.current = 0;
        }
        return this.bucket[this.current++]
    }
    setAfter(player) {
        if (player === 4) {
            player = 0;
        }
        this.first = false
        this.current = ++player
    }
    static getAfter(player){
        if (player === 4) {
            player = 0;
        }
        return ++player
    }
}

module.exports = Flow
