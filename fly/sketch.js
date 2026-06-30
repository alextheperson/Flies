let LIFE_SPAN = document.getElementById('lifeSpan').value; // how long flies do live
let POPULATION = document.getElementById('population').value; // how manny flies do we want
let REWARD_MULT = document.getElementById('reward').value; // what is the reward for finding food
let PUNISH_DIV = document.getElementById('punishment').value; // punishment for hitting things
let MUTATION = document.getElementById('mutation').value / 100; // the mutation rate

var populationAge = 0;
var generation = 0;
var averageFit = 0;
var sucsessRate = 0;
var totalSucsessRate = 0;
var population;
var elemWidth = 0;

var paused = true;

var selectedFly = 0;

var houseflyGraphic;

function frame() {
    document.getElementById('age').max = LIFE_SPAN;
    document.getElementById('age').value = populationAge;

    population.show();
    drawInspector();

    document.getElementById('currentStats').innerHTML = 
`<tbody>
    <tr>
        <th>Generation</th>
        <td>${generation}</td>
    </tr>
    <tr>
        <th>Average Fitness</th>
        <td>${averageFit}</td>
    </tr>
    <tr>
        <th>Success Rate</th>
        <td>${sucsessRate}/${POPULATION}</td>
    </tr>
    <tr>
        <th>Total Successes</th>
        <td>${totalSucsessRate}</td>
    </tr>
    <tr>
        <th>Age</th>
        <td>${populationAge}</td>
    </tr>
</tbody>`

    sucsessRate = population.sucsessRate;
    totalSucsessRate = population.totSucsessRate;
}

function setup() {
  createCanvas(
    document.getElementById('canvas').offsetWidth,
    document.getElementById('canvas').offsetHeight
  ).parent('canvas');

  houseflyGraphic = loadImage('images/HouseFly2_.png');

  populationAge = 0;
  generation = 0;
  averageFit = 0;
  sucsessRate = 0;
  totalSucsessRate = 0;

  imageMode(CENTER);

  LIFE_SPAN = document.getElementById('lifeSpan').value; // how long flies do live
  POPULATION = document.getElementById('population').value; // how manny flies do we want
  let flySpeed = document.getElementById('speed').value;
  REWARD_MULT = document.getElementById('reward').value; // what is the reward for finding food
  PUNISH_DIV = document.getElementById('punishment').value; // punishment for hitting things
  MUTATION = document.getElementById('mutation').value / 100; // the mutation rate

  population = new Population(
    LIFE_SPAN,
    POPULATION,
    REWARD_MULT,
    PUNISH_DIV,
    undefined,
    houseflyGraphic
  );
}

function draw() {
  background('#ccc');

  frame();

  if (!paused) {
      step()
  }
}

function step() {
    population.run(Math.floor(populationAge));
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

    populationAge ++;
    averageFit = population.findAverageFitness();

    if (populationAge == LIFE_SPAN || allHit == true) {
        population.evaluate();

        averageFit = population.findAverageFitness();

        let newFlies = population.generateNewPop(MUTATION);

        population = new Population(
            LIFE_SPAN,
            POPULATION,
            REWARD_MULT,
            PUNISH_DIV,
            newFlies,
            houseflyGraphic
        );

        populationAge = 0;
        generation++;
        population.sucsessRate = 0;
    }
}

function drawInspector() {
    if (selectedFly === null) {
        return
    }

    let context = 15;

    document.getElementById("inspector-title").innerHTML = `Fly ${selectedFly.toString().padStart(3, "0")}`;

    let genes = population.flies[selectedFly].dna.genes.slice(Math.max(populationAge-context, 0), Math.min(populationAge+context, LIFE_SPAN));
    let offset = Math.max(populationAge-context, 0);

    let statTable = document.getElementById("inspector-stats");
    statTable.innerHTML = `
<tr>
    <th>pos</th>
    <td>x: ${population.flies[selectedFly].pos.x}<br>y: ${population.flies[selectedFly].pos.y}</td>
</tr>
<tr>
    <th>heading</th>
    <td>${population.flies[selectedFly].heading}</td>
</tr>
<tr>
    <th>fitness</th>
    <td>${population.flies[selectedFly].fitness}</td>
</tr>
<tr>
    <th>hitSomething</th>
    <td>${population.flies[selectedFly].hitSomething}</td>
</tr>
<tr>
    <th>hitFood</th>
    <td>${population.flies[selectedFly].hitFood}</td>
</tr>
    `;

    let geneTable = document.getElementById("inspector-genes");
    geneTable.innerHTML = "";

    for (let i = 0; i < genes.length; i++) {
        let row  = document.createElement("tr");
        if (i + offset === populationAge) {
            row.classList.add("active");
        }

        let index = document.createElement("td");
        index.innerHTML = i + offset;
        row.appendChild(index);

        let originalIndex = document.createElement("td");
        originalIndex.innerHTML = genes[i].index;
        if (i+offset !== genes[i].index) originalIndex.classList.add("relocated")
        row.appendChild(originalIndex);

        let type = document.createElement("td");
        type.innerHTML = genes[i].type;
        row.appendChild(type);

        let angle = document.createElement("td");
        angle.innerHTML = genes[i].angle ?? "";
        row.appendChild(angle);

        let from = document.createElement("td");
        from.innerHTML = `from ${genes[i].fromSide}`;
        row.appendChild(from);
        
        geneTable.appendChild(row)
    }

}
