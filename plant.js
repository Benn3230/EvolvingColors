class Plant {
    constructor(automata, x, y, color) {
        this.color = color;
        this.growth = 0;
        this.automata = automata;

        this.x = x;
        this.y = y;
    }

    wrap(val, max) {
        return (max + val) % max;
    }

    mutate() {
        const x = this.wrap(this.x + randomInt(3) - 1, params.canvasSize);
        const y = this.wrap(this.y + randomInt(3) - 1, params.canvasSize);
        // Shift hue by -10 to 10
        const hue = this.wrap(this.color + randomInt(21) - 10, 360);
        if (!this.automata.plants[x][y]) {
            this.automata.plants[x][y] = new Plant(this.automata, x, y, hue);
        }
    }

    update() {

        if (this.growth < 80) {
            this.growth += 20;
        }

        if (this.growth >= 80) {
            this.mutate();
            this.growth -= 80;
        }

        if (Math.random() < 0.001) {
            this.automata.plants[this.x][this.y] = null;
        }
    }

    getColor() {
        return this.color;
    }

    getGrowth() {
        return this.growth;
    }
}