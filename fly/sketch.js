let LIFE_SPAN = document.getElementById("lifeSpan").value; // how long flies do live
let POPULATION = document.getElementById("population").value; // how manny flies do we want
let REWARD_MULT = document.getElementById("reward").value; // what is the reward for finding food
let PUNISH_DIV = document.getElementById("punishment").value; // punishment for hitting things
let MUTATION = document.getElementById("mutation").value / 100; // the mutation rate

var populationAge = 0
var generation = 0
var averageFit = 0
var sucsessRate = 0
var totalSucsessRate = 0
var population
var elemWidth = 0

var houseflyGraphic

function frame() {
    document.getElementById("age").max = LIFE_SPAN
    document.getElementById("age").value = populationAge
}

function setup() {
    createCanvas(document.getElementById("canvas").offsetWidth, document.getElementById("canvas").offsetHeight).parent("canvas");

    houseflyGraphic = loadImage("images/HouseFly2_.png")

    populationAge = 0
    generation = 0
    averageFit = 0
    sucsessRate = 0
    totalSucsessRate = 0

    imageMode(CENTER)

    LIFE_SPAN = document.getElementById("lifeSpan").value; // how long flies do live
    POPULATION = document.getElementById("population").value; // how manny flies do we want
    let flySpeed = document.getElementById("speed").value;
    REWARD_MULT = document.getElementById("reward").value; // what is the reward for finding food
    PUNISH_DIV = document.getElementById("punishment").value; // punishment for hitting things
    MUTATION = document.getElementById("mutation").value / 100; // the mutation rate

    population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV, undefined, houseflyGraphic);

    document.getElementById("stats").innerHTML = "Reward: " + str(REWARD_MULT) + "<br>Punishment: " + str(PUNISH_DIV) + "<br>Speed: " + str(flySpeed) + "<br>Population Size: " + str(POPULATION) + "<br>Life Span: " + str(LIFE_SPAN) + "<br>Mutation Rate: " + str(MUTATION);
}

function draw() {
    // resizeCanvas(document.getElementById("canvas").offsetWidth, document.getElementById("canvas").offsetHeight)
    background(238);

    frame();

    document.getElementById("currentStats").innerHTML = "Generation: " + str(generation) + "<br>Average Fitness: " + str(averageFit) + "<br>Success Rate: " + str(sucsessRate) + "/" + POPULATION + "<br>Total Successes " + str(totalSucsessRate) + "<br>Age: " + str(populationAge);

    sucsessRate = population.sucsessRate;
    totalSucsessRate = population.totSucsessRate

    population.run(populationAge)
    let numHit = 0;
    let allHit = 0;
    for (let i = 0; i < population.pop_size; i++) {
        if (population.flies[i].hitSomething == true) {
            numHit += 1;
        }
    }
    if (numHit == population.pop_size) {
        allHit = true;
    }
    populationAge++;
    averageFit = population.findAverageFitness();
    if (populationAge == LIFE_SPAN || allHit == true) {
        population.evaluate();

        averageFit = population.findAverageFitness();

        let newFlies = population.generateNewPop(MUTATION)

        population = new Population(LIFE_SPAN, POPULATION, REWARD_MULT, PUNISH_DIV, newFlies, houseflyGraphic)
        populationAge = 0;
        generation++
        population.sucsessRate = 0;
    }
}
