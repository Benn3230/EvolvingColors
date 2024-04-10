/**
 * Animat class for the Evolving Colors simulation.
 */
class Animat {
    /**
     * Initializes this animat.
     * @param automata The automata which controls the game board
     * @param x The x (width) position of this animat in the game board
     * @param y The y (height) position of this animat in the game board
     * @param color The color of this animat
     */
    constructor(automata, x, y, color) {
        this.automata = automata;
        this.x = x;
        this.y = y;
        this.color = color;
        this.energy = 50;   // Start with half-full energy
    }

    /**
     * Calculates the difference in color between this animat and the specified plant.
     * @param  plant The plant to compare colors with
     * @returns The (wrapped) difference between the colors
     */
    colorDifference(plant) {
        let difference = Math.abs(this.color - plant.color);
        /* Need to wrap difference around 180: a difference of 270 is really a difference of 90
           from the other direction */
        if (difference > 180) {
            difference = 360 - difference;
        }
        return difference;
    }

    /**
     * Attempts to eat the plant this animat is currently on top of.
     */
    eatPlant() {
        const plant = this.automata.plants[this.x][this.y];
        let difference = 180;   // If plant does not exist, use max difference of 180

        if (plant) {
            difference = this.colorDifference(plant);
            const selectivity = document.getElementById("selectivity").value;
        
            // Check if difference is less than max allowed difference (selectivity)
            if (180 - selectivity >= difference) {
                this.automata.plants[this.x][this.y] = null;    // Kill plant
                // Add (or subtract) energy relative to growth rate and difference in color
                this.energy += 100 / (100 - document.getElementById("animatGrowth").value) * ((90 - difference) / 90);
            }
        }
    }

    /**
     * Removes this animat from the game board.
     */
    killAnimat() {
        this.removeFromWorld = true;
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
     * Mutates this animat and adds the new mutation to the game board.
     */
    mutate() {
        // Shift color by negative maxShift to positive maxShift
        const maxShift = document.getElementById("animatMutate").value;
        const hue = this.wrap(this.color + randomInt(2 * maxShift + 1) - maxShift, 360);
        // Add mutated animat on top of the parent one
        gameEngine.addEntity(new Animat(this.automata, this.x, this.y, hue));
    }

    /**
     * Attempts to move this animat towards the plant with the most similar coloring.
     */
    move() {
        let bestDiff = 181; // Default difference is higher than possible
        let x = this.x;
        let y = this.y;

        // Check the 8 cells immediately surrounding this animat (wrap around game board)
        for (let i = -1; i < 2; i++) {
            let tempX = this.wrap(this.x + i, params.canvasSize);
            for (let j = -1; j < 2; j++) {
                let tempY = this.wrap(this.y + j, params.canvasSize);
                let currPlant = this.automata.plants[tempX][tempY];

                // If plant doesn't exist, diff is set to outside possible range
                let tempDiff = currPlant ? this.colorDifference(currPlant) : 181;

                // Update best position if difference is less
                if (tempDiff < bestDiff) {
                    x = tempX;
                    y = tempY;
                    bestDiff = tempDiff;
                    
                }
            }
        }

        // Subtract energy for moving if option selected
        if (document.getElementById("moveCost").checked && this.x != x && this.y != y) {
            this.energy -= 5;
        }

        this.x = x;
        this.y = y;
    }

    /**
     * Updates this animat.
     */
    update() {
        this.move();
        this.eatPlant();
        
        // If adult, mutate
        if (this.energy > 100) {
            this.mutate();
            this.energy -= 100;
        }

        // Chance to kill animat, or kill if energy falls below 0
        if (Math.random() < 0.01 || this.energy <= 0) {
            this.killAnimat();
        }
    }

    /**
     * Draws this animat on the game board.
     * @param ctx The canvas to display on
     */
    draw(ctx, game) {
        ctx.fillStyle = hsl(this.color, 100, 50);
        ctx.strokeStyle = "Black";
        ctx.beginPath();
        ctx.arc(params.cellSize * (this.x + 0.5), params.cellSize * (this.y + 0.5), params.cellSize / 2, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}