class Fly {
    constructor(lifeSpan, reward, punishment, food, img) {
        this.pos = createVector(width / 2, height - 40)
        this.heading = 3*PI/2;
        this.dna = new DNA(lifeSpan);
        this.reward = reward;
        this.punishment = punishment;
        this.food = food;
        this.fitness = 0;
        this.hitSomething = false;
        this.img = img;
        this.hitFood = false;
    }

    calcFitness(time) {
        //do fitness stuff
        let distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.fitness = map(distance, 0, (width**2 + height**2)**0.5, 500, 0);
        if (!this.hitSomething) {
            this.fitness += time * 5;
        }
    }

    update(count, wall1, wall2, wall3) {

        if (!this.hitSomething) {
            // if we are not hitting something, then MOVE
            switch (this.dna.genes[count].type) {
                case "TURN":
                    this.heading += radians(this.dna.genes[count].angle);
                    break;
                case "SMELL":
                    this.heading = Math.atan2(this.food.pos.y - this.pos.y, this.food.pos.x - this.pos.x);
                    break;
                case "STEP":
                    let vec = createVector(0, document.getElementById("speed").value).setHeading(this.heading);
                    this.pos.add(vec);
                    break;
            }

        }

        this.calcFitness(count);

        // if we hit edges
        if (this.pos.y > height || this.pos.y < 0 || this.pos.x > width || this.pos.x < 0) {
            this.hitSomething = true;
            this.fitness = Math.max(this.fitness - this.punishment, 0);
        }
        // hit wall
        if (wall1.hitWall(this.pos.x, this.pos.y) || wall2.hitWall(this.pos.x, this.pos.y) || wall3.hitWall(this.pos.x, this.pos.y)) {
            this.hitSomething = true
            this.fitness = Math.max(this.fitness - this.punishment, 0);
        }
        //hit food
        let distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        if (distance < this.food.radius / 2) {
            this.hitSomething = true
            this.hitFood = true
            this.fitness += (this.reward-0);
        }
    }

    show(selected) {
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(0, 0, 0);

        textSize(10);
        textAlign(CENTER, TOP);
        text(this.fitness.toFixed(1), 0, 15);

        rotate(this.heading);
        image(this.img, 0, 0, 25, 25);

        if (selected) {
            stroke(255, 0, 0);
            noFill();
            rectMode(CENTER);
            rect(0, 0, 25, 25);
            fill(255, 0, 0);
            noStroke();
            translate(15, 0);
            triangle(0, -3, 6, 0, 0, 3);
        }
        pop();
    }
}
