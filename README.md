# Flies
A customizable evolutionary algorithm to get flies to food


### The Goal
The goal of this program is to breed a fly(black) that can get to the 'food'(blue) without touching the walls(red) or the 
edges(edges) by using an Evolutionary Algorithim
### Controls
#### Reward
The amount that is multiplied to the fly's score when it touches te food
#### Punishment
The amount that the fly's is divided by when they hit the wall or edges
#### Speed
How fast the flies go
###### Population Size
How many flies there are NOTE: the more flies there are the laggier it gets.
#### Life Span
How long the generation lasts
#### Mutation Rate
How often a fly will Mutate
#### Run Experiment
Runs the experiment with the current settings
#### Reset Controls
Resets the values of the controls

*Note that the way an Evolutionary Algorithim functions is not a good parenting technique.*
### How It Works

The evolutionary algorithim starts by creating [insert population size here] flies and then, every frame it points them in a 
random direction and pushes them. The amount that they get pushed depends on the speed setting. After they get pushed it 
checks to see if any of them hit any thing if they did it changes their score acordingly. Once the life time ofthat generation 
is over, it evaluates them. the way that it evaluates them is by seeing how high their scores are at the end. It then starts 
creating the next generation it does this by select ing two random flies(although the higher the score of the fly is the more 
likely it is to be picked and the two parents can be the same fly). and then goes through a list of all of their actions and 
chooses a random one.

Once it has a full population it will then do the same thing again.
