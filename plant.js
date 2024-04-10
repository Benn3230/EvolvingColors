/**
 * Plant class for the Evolving Colors simulation.
 */
class Plant {
    /**
     * Initializes the plant with position, color, and the parent automata
     * @param automata The automata which controls the game board
     * @param x The x (width) position of this plant in the game board
     * @param y The y (height) position of this plant in the game board
     * @param color The color of this plant
     */
    constructor(automata, x, y, color) {
        this.color = color;
        this.growth = 0;
        this.automata = automata;

        this.x = x;
        this.y = y;
    }

    /**
     * Wraps the given value around the specified maximum value.
     * @param val The value to be wrapped
     * @param max The maximum allowed value
     * @returns The value wrapped around the maximum
     */
    wrap(val, max) {
        return (max + val) % max;
    }

    /**
     * Mutates this plant and adds the new mutation to the game board.
     */
    mutate() {
        // Choose -1, 0, or 1 to change x/y by, wrap around game board
        const x = this.wrap(this.x + randomInt(3) - 1, params.canvasSize);
        const y = this.wrap(this.y + randomInt(3) - 1, params.canvasSize);
        // Shift color from negative maxShift to positive maxShift
        const maxShift = document.getElementById("plantMutate").value;
        const hue = this.wrap(this.color + randomInt(2 * maxShift + 1) - maxShift, 360);
        // If plant already exists, don't override it
        if (!this.automata.plants[x][y]) {
            this.automata.plants[x][y] = new Plant(this.automata, x, y, hue);
        }
    }

    /**
     * Returns the color of this plant.
     * @returns The color of this plant
     */
    getColor() {
        return this.color;
    }

    /**
     * Performs an update on this plant.
     */
    update() {
        // If plant is not mature (growth >= 100), add to growth using growth rate
        if (this.growth < 100) {
            this.growth += 100 / (100 - document.getElementById("plantGrowth").value);
        }

        // If mature, mutate and restart growth
        if (this.growth >= 100) {
            this.mutate();
            this.growth -= 100;
        }

        // If allowd to die, chance to kill plant each update
        if (Math.random() < 0.001 && !document.getElementById("noPlantDeath").checked) {
            this.automata.plants[this.x][this.y] = null;
        }
    }
}