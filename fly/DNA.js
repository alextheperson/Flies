class BasePair {
    constructor(i) {
        this.index = i;
        let randomNumber = Math.random();
        if (randomNumber < 0.7) {
            this.type = "STEP";
        } else if (randomNumber < 0.9) {
            this.type = "TURN";
        } else {
            this.type = "SMELL";
        }

        if (this.type == "TURN") {
            this.angle = map(Math.random(), 0, 1, -15, 15);
        }
        this.side("rand");
    }

    side(p) {
        this.fromSide = p;
        return this;
    }
}

class DNA {
    constructor(length) {
        this.genes = []

        for (let i = 0; i < length; i++) {
            this.genes[i] = new BasePair(i);
        }
    }

    generateMergedDna(mutationRate, parentA, parentB) {
        let tempGenes = [];

        for (let i = 0; i < parentA.dna.genes.length; i++) {
            let p = Math.random() > 0.5;

            tempGenes.push(p ? parentA.dna.genes[i].side("A") : parentB.dna.genes[i].side("B"));

            let ifmutate = Math.random();

            if (mutationRate > ifmutate) {
                tempGenes[i] = new BasePair(i).side("Mut");
            }
        }

        let ifmutate = Math.random();
        // Possibly to a translocation mutation;
        if (mutationRate > ifmutate) {
            let cutStart = Math.floor(random(tempGenes.length));
            let cutLength = Math.floor(Math.min(random(tempGenes.length / 10), tempGenes.length - cutStart));
            let reInsertionPoint = Math.floor(random(tempGenes.length - cutStart + 1));

            let slice = tempGenes.splice(cutStart, cutLength);
            tempGenes.splice(reInsertionPoint, 0, ...slice);
        }

        this.genes = tempGenes;
    }
}
