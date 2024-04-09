class Animat {
    constructor(automata, x, y, color) {
        this.automata = automata;
        this.x = x;
        this.y = y;
        this.color = color;
        this.energy = 50;
    }
    
    wrap(val, max) {
        return (max + val) % max;
    }

    mutate() {
        const x = this.wrap(this.x + randomInt(3) - 1, params.canvasSize);
        const y = this.wrap(this.y + randomInt(3) - 1, params.canvasSize);
        // Shift hue by -10 to 10
        const hue = this.wrap(this.color + randomInt(21) - 10, 360);
        gameEngine.addEntity(this.automata, x, y, hue);
    }

    colorDifference(plant) {
        let diff = plant ? Math.abs(this.color - plant.color) : 360;
        return (180 - diff) / 180;
    }

    eatPlant() {
        const plant = this.automata.plants[this.x][this.y];
        const difference = this.colorDifference(plant);
        const selectivity = 0;
        
        if (plant && selectivity <= difference) {
            this.energy += 20 * difference;
            console.log("ate plant!");
            this.automata.plants[this.x][this.y] = null;
        }
    }

    killAnimat() {
        this.removeFromWorld = true;
    }

    move() {
        let bestDiff = -1;
        let x = this.x;
        let y = this.y;

        for (let i = -1; i < 2; i++) {
            let tempX = this.wrap(this.x + i, params.canvasSize);
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j ===0) {
                    continue;
                }
                
                let tempY = this.wrap(this.y + j, params.canvasSize);
                let currPlant = this.automata.plants[tempX][tempY];
                let tempDiff = this.colorDifference(currPlant);

                if (tempDiff > bestDiff) {
                    x = tempX;
                    y = tempY;
                    bestDiff = tempDiff;
                    
                }
            }
        }

        this.x = x;
        this.y = y;
    }

    update() {
        this.move();
        this.eatPlant();
        
        if (this.energy > 100) {
            this.mutate();
            this.energy -= 100;
        }

        if (Math.random() < 0.01 || this.energy <= 0) {
            this.killAnimat();
        }
        
    }

    draw(ctx, game) {
        ctx.fillStyle = hsl(this.color, 75, 50);
        ctx.strokeStyle = "Black";
        ctx.beginPath();
        ctx.arc(params.cellSize * (this.x + 0.5), params.cellSize * (this.y + 0.5), params.cellSize / 2, 0, 2* Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}