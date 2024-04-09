class Automata {
    constructor(ctx) {

        this.plants = [];
        for (let i = 0; i < params.canvasSize; i++) {
            this.plants[i] = [];
            for (let j = 0; j < params.canvasSize; j++) {
                this.plants[i][j] = null;
            }
        }
    }

    emptyPlants() {
        for (let i = 0; i < params.canvasSize; i++) {
            for (let j = 0; j < params.canvasSize; j++) {
                this.plants[i][j] = null;
            }
        }
    }

    addPlant() {
        const x = randomInt(params.canvasSize);
        const y = randomInt(params.canvasSize);
        this.plants[x][y] = new Plant(this, x, y, randomInt(360));
    }

    update() {
        for (let i = 0; i < params.canvasSize; i++) {
            for (let j = 0; j < params.canvasSize; j++) {
                if (this.plants[i][j]) {
                    this.plants[i][j].update();
                }
            }
        }
    }

    draw(ctx, game) {
        ctx.strokeStyle = "Black";
        for (let i = 0; i < params.canvasSize; i++) {
            for (let j = 0; j < params.canvasSize; j++) {
                const plant = this.plants[i][j];
                if (plant) {
                    ctx.fillStyle = hsl(plant.getColor(), 100, 50);
                    ctx.fillRect(i * params.cellSize, j * params.cellSize, params.cellSize, params.cellSize);
                    ctx.strokeRect(i * params.cellSize, j * params.cellSize, params.cellSize, params.cellSize);
                }
            }
        }
    }
}