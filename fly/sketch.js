let LIFE_SPAN = document.getElementById("lifeSpan").value; // how long flies do live
let POPULATION = document.getElementById("population").value; // how manny flies do we want
let REWARD_MULT = document.getElementById("reward").value; // what is the reward for finding food
let PUNISH_DIV = document.getElementById("punishment").value; // punishment for hitting things
let MUTATION = document.getElementById("mutation").value/100; // the mutation rate

let count = 0
let generation = 0
let averageFit = 0
let sucsessRate = 0
let totalSucsessRate = 0
let population
let elemWidth = 0

function frame() {
  if (elemWidth >= 99) {
    elemWidth += 1;
  } else {
    elemWidth=map(count, 1, LIFE_SPAN, 1, 97)
    elemWidth++; 
    document.getElementById("myBar").style.width = elemWidth + '%'; 
  }
}

function setup() {
    createCanvas(1000, 555);
    
    count = 0
    generation = 0
    averageFit = 0
    sucsessRate = 0
    totalSucsessRate = 0

    LIFE_SPAN = document.getElementById("lifeSpan").value; // how long flies do live
    POPULATION = document.getElementById("population").value; // how manny flies do we want
    let speed = document.getElementById("speed").value;
    REWARD_MULT = document.getElementById("reward").value; // what is the reward for finding food
    PUNISH_DIV = document.getElementById("punishment").value; // punishment for hitting things
    MUTATION = document.getElementById("mutation").value/100; // the mutation rate

    population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV);

    document.getElementById("stats").innerHTML = "Reward: " + str(REWARD_MULT) + "<br>Punishment: " + str(PUNISH_DIV) + "<br>Speed: " + str(speed) + "<br>Population Size: " + str(POPULATION) + "<br>Life Span: " + str(LIFE_SPAN) + "<br>Mutation Rate: " + str(MUTATION);
}

function draw() {
    background(170, 170, 170);
    
    frame();

    document.getElementById("currentStats").innerHTML = "Generation: " + str(generation) + "<br>Average Fitness: " + str(averageFit) + "<br>Success Rate: " + str(sucsessRate) + "/" + POPULATION + "<br>Total Successes " + str(totalSucsessRate) + "<br>Age: " + str(count);
    
    sucsessRate = population.sucsessRate;
    totalSucsessRate = population.totSucsessRate

    population.run(count)
    let numHit = 0;
    let allHit = 0;
    for(let i = 0; i < population.pop_size; i++){
      if(population.flies[i].hitSomething == true){
        numHit += 1;
      }
    }
    if(numHit == population.pop_size){
      allHit = true;
    }
    count ++;
    averageFit = population.findAverageFitness();
    if (count == LIFE_SPAN || allHit == true){
        population.evaluate();

        averageFit = population.findAverageFitness();

        let newFlies = population.generateNewPop(MUTATION)

        population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV, newFlies)
        document.getElementById("myBar").style.width = 97 + '%';
        count = 0;
        generation++
        population.sucsessRate = 0;
        elemWidth = 0;
    }
}
