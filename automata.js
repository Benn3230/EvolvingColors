/**
 * Automata class to control the game board of the Evolving Colors simulation.
 */
class Automata {
    /**
     * Initializes the game board with no plants.
     */
    constructor() {
        this.plants = [];
        for (let i = 0; i < params.canvasSize; i++) {
            this.plants[i] = [];    // Each inner array represents a column
            for (let j = 0; j < params.canvasSize; j++) {
                this.plants[i][j] = null;   // Add null to every cell
            }
        }
    }

    /**
     * Adds a plant with a random color to a random spot on this game board.
     */
    addPlant() {
        const x = randomInt(params.canvasSize);
        const y = randomInt(params.canvasSize);
        this.plants[x][y] = new Plant(this, x, y, randomInt(360));
    }

    /**
     * Clears all plants from this game board.
     */
    emptyPlants() {
        for (let i = 0; i < params.canvasSize; i++) {
            for (let j = 0; j < params.canvasSize; j++) {
                this.plants[i][j] = null;
            }
        }
    }

    /**
     * Updates the game board and each living plant.
     */
    update() {
        for (let i = 0; i < params.canvasSize; i++) {
            for (let j = 0; j < params.canvasSize; j++) {
                // Check if a plant actually exists here
                if (this.plants[i][j]) {
                    this.plants[i][j].update();
                }
            }
        }
    }

    /**
     * Draws each plant on the game board.
     * @param ctx The canvas to display on
     */
    draw(ctx, game) {
        ctx.strokeStyle = "Black";
        for (let i = 0; i < params.canvasSize; i++) {
            for (let j = 0; j < params.canvasSize; j++) {
                const plant = this.plants[i][j];
                // Check if plant exists
                if (plant) {
                    ctx.fillStyle = hsl(plant.color, 100, 50);  // Color of plant
                    // Display ith column, jth row plant with specified cell size (10)
                    ctx.fillRect(i * params.cellSize, j * params.cellSize, params.cellSize, params.cellSize);
                    ctx.strokeRect(i * params.cellSize, j * params.cellSize, params.cellSize, params.cellSize);
                }
            }
        }
    }
}