let openedBefore = false;
let myWindow;
function printResult() {
    let LIFE_SPAN = document.getElementById("lifeSpan").value; // how long flies do live
    let POPULATION = document.getElementById("population").value; // how manny flies do we want
    let speed = document.getElementById("speed").value;
    let REWARD_MULT = document.getElementById("reward").value; // what is the reward for finding food
    let PUNISH_DIV = document.getElementById("punishment").value; // punishment for hitting things
    let MUTATION = document.getElementById("mutation").value / 100; // the mutation rate
    document.getElementById("out").innerHTML = "Reward: " + str(REWARD_MULT) + "<br>Punishment: " + str(PUNISH_DIV) + "<br>Speed: " + str(speed) + "<br>Population Size: " + str(POPULATION) + "<br>Life Span: " + str(LIFE_SPAN) + "<br>Mutation Rate: " + str(MUTATION);
}

function re() {
    document.getElementById('lifeSpan').value = 800;
    document.getElementById('population').value = 190;
    document.getElementById('reward').value = 500;
    document.getElementById('punishment').value = 3;
    document.getElementById('mutation').value = 10;
    document.getElementById('speed').value = 10;
    printResult()
}

function info() {
    if (openedBefore) {
        myWindow.close();
    }
    myWindow = window.open("", "myWindow", "width=800,height=500");
    myWindow.document.write(`
    <link href='//alexsol.is/style.css' rel='stylesheet' type='text/css' />
    <link href='style.css' rel='stylesheet' type='text/css' />
    <article>
        <h1 style='text-align:center;width:calc(100% - 17px)'>Information/Help</h1>
    </article>
    <section>
        <h3>The Goal</h3>
        The goal of this program is to breed a fly (black) that can get to the food (blue) without touching the walls (red) or the edges (edges) by using an <b>Evolutionary Algorithim</b>
    </section>
    <section>
        <h3>Controls</h3>
        <b>Reward</b><br>The amount that is multiplied to the fly's score when it touches te food<br><b>Punishment</b><br>The amount that the fly's is divided by when they hit the wall or edges<br><b>Speed</b><br>How fast the flies go<br><b>Population Size</b><br>How many flies there are NOTE: the more flies there are the laggier it gets.<br><b>Life Span</b><br>How long the generation lasts<br><b>Mutation Rate</b><br>How often a fly will Mutate<br><b>Run Experiment</b><br>Runs the experiment with the current settings<br><b>Reset Controls</b><br>Resets the values of the controls<br>
    </section>
    <section>
        <h3>How It Works</h3>
        <img src='images/EA Flow.png' width='500'>
        The evolutionary algorithim starts by creating [insert population size here] flies and then, every frame it points them in a random direction and pushes them. The amount that they get pushed depends on the speed setting. After they get pushed it checks to see if any of them hit any thing if they did it changes their score acordingly. Once the life time ofthat generation is over, it evaluates them. the way that it evaluates them is by seeing how high their scores are at the end. It then starts creating the next generation it does this by select ing two random flies(although the higher the score of the fly is the more likely it is to be picked and the two parents can be the same fly). and then goes through a list of all of their actions and chooses a random one.
        <img src='images/EA Breeding.png' width='500'><br>Once it has a full population it will then do the same thing again.
    </section>`
    );
    openedBefore = true;
}