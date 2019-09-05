class DNA {
    constructor(length) {
        this.genes = []
        
        for(let i = 0; i< length; i++){
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(document.getElementById("speed").value / 100);
        }
    }

    generateMergedDna(mutationRate, parentA, ParentB){
        let tempGenes = [];

        for(let i = 0; i < parentA.dna.genes.length; i++){
            let p = int(random());

            tempGenes.push(p ? parentA.dna.genes[i] : ParentB.dna.genes[i]);

            let ifmutate = random();

            if(mutationRate > ifmutate){
                tempGenes[i] = p5.Vector.random2D();
                tempGenes[i].setMag(0.1);
            }
        }
        this.genes = tempGenes;
    }
}