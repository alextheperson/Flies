class Fly {
    constructor(lifeSpan, reward, punishment, food, img) {
        this.pos = createVector(width / 2, height - 40)
        this.acc = createVector();
        this.vel = createVector();
        this.dna = new DNA(lifeSpan);
        this.reward = reward;
        this.punishment = punishment;
        this.food = food;
        this.fitness = 0;
        this.hitSomething = false
        this.img = img
        this.hitFood = false
    }

    calcFitness() {
        //do fitness stuff
        let distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.fitness = map(distance, 0, width, width, 0);

        //apply Modifiers
        if (distance <= this.food.radius) {
            this.fitness *= this.reward;
        }

        if (this.hitSomething) {
            this.fitness /= this.punishment;
        }
    }

    update(count, wall1, wall2, wall3) {

        if (!this.hitSomething) {
            // if we are not hitting something, then MOVE
            this.applyForce(this.dna.genes[count]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
        // if we hit edges
        if (this.pos.y > height || this.pos.y < 0 || this.pos.x > width || this.pos.x < 0) {
            this.hitSomething = true;
        }
        // hit wall
        if (wall1.hitWall(this.pos.x, this.pos.y) || wall2.hitWall(this.pos.x, this.pos.y) || wall3.hitWall(this.pos.x, this.pos.y)) {
            this.hitSomething = true
        }
        //hit food
        let distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        if (distance < this.food.radius) {
            this.hitSomething = true
            this.hitFood = true
        }

        this.calcFitness();
    }

    applyForce(force) {
        this.acc.add(force)
    }

    show() {
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        // fill(255, 255, 255, 150);
        // textSize(10);
        // text(this.fitness.toFixed(1), 0, 0);
        rotate(this.vel.heading());
        fill(0, 0, 0, 150);
        image(this.img, 0, 0, 25, 25)
        pop();
    }
}