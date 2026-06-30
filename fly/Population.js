class Population {
    constructor(life_span, pop_size, reward, punishment, new_pop, img) {
        this.life_span = life_span;
        this.pop_size = pop_size;
        this.reward = reward;
        this.punishment = punishment;
        this.sucsessRate = 0
        this.totSucsessRate = 0

        this.food = new Food(width / 2, 50, 30);
        this.wall1 = new Wall(width / 2, height - height / 3, width / 3, height / 20);
        this.wall2 = new Wall(width / 8, height - height / 2, width / 4, height / 20);
        this.wall3 = new Wall(map(width / 8, 0, width, width, 0), height - height / 2, width / 4, height / 20);

        this.flies = [];
        this.pool = [];

        this.flyImg = img

        if (new_pop === undefined) {
            for (let i = 0; i < pop_size; i++) {
                this.flies[i] = new Fly(this.life_span, this.reward, this.punishment, this.food, this.flyImg);
            }
        }
        else {
            this.flies = new_pop;
        }

    }

    evaluate() {
        let maxFit = 0


        for (let i = 0; i < this.pop_size; i++) {
            if (this.flies[i].fitness > maxFit) {
                maxFit = this.flies[i].fitness;
            }
        }



        for (let i = 0; i < this.pop_size; i++) {
            // The higher the fitness, the more likely the fly is to be chosen as a parent
            let poolRank = Math.max(this.flies[i].fitness / maxFit * 20, 1)

            for (let j = 0; j < poolRank; j++) {
                this.pool.push(this.flies[i])
            }
        }
    }

    findAverageFitness() {
        let totalFitness = 0;

        for (let i = 0; i < this.pop_size; i++) {
            totalFitness += this.flies[i].fitness;
        }

        return (totalFitness / this.pop_size).toFixed(1);
    }

    generateNewPop(mutationRate) {
        let NewFlies = [];
        for (let i = 0; i < this.pop_size; i++) {

            let newfly = new Fly(this.life_span, this.reward, this.punishment, this.food, this.flyImg);

            let parentA = random(this.pool);
            let parentB = random(this.pool);

            newfly.dna.generateMergedDna(mutationRate, parentA, parentB);

            NewFlies.push(newfly);

        }
        return NewFlies;
    }

    run(count) {
        this.sucsessRate = 0;
        this.totSucsessRate = 0;

        for (let i = 0; i < this.pop_size; i++) {
            this.flies[i].update(count, this.wall1, this.wall2, this.wall3);
            if (this.flies[i].hitFood) {
                this.sucsessRate += 1
                this.totSucsessRate += 1
            }
        }
    }

    show() {
        this.food.show();
        this.wall1.show();
        this.wall2.show();
        this.wall3.show();
        for (let i = 0; i < this.pop_size; i++) {
            if (mouseIsPressed && dist(mouseX, mouseY, this.flies[i].pos.x, this.flies[i].pos.y) < 25) {
                selectedFly = i;
            }
            this.flies[i].show(selectedFly === i);
        }
    }
}
