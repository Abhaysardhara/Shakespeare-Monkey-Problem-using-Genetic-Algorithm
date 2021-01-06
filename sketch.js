// setup()
//    # Initialize random population

// draw()
//  # Step 1: Natural Selection (Mating pool generation)

//  # Step 2: Reproduction
//       1. select two parent from mating pool
//       2. Perform cross over to generate child
//       3. Apply Mutation
//       4. Store it to population array (New Generation)

//  # step 3: Evaluate new generation
//       # If target found - Stop to loop
//       # Else Repeat above tasks


let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  bestPhrase.position(windowWidth/2 - 100, 10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(windowWidth/2 - 100, 180);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.position(windowWidth/2 - 100, 70);
  stats.class("stats");

  target = "My name is Abhay.";
  console.log(target);
  popmax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
    // Generate mating pool
    population.naturalSelection();
    //Create next generation
    population.generate();
    // Calculate fitness
    population.calcFitness();

    population.evaluate();

    // If we found the target phrase, stop
    if (population.isFinished()) {
      //println(millis()/1000.0);
      noLoop();
    }

    displayInfo();
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext = "Generations:     " + population.getGenerations() + "<br>";
  statstext += "Average Fitness:       " + nf(population.getAverageFitness()) * 100 + "<br>";
  statstext += "Total Population:      " + popmax + "<br>";
  statstext += "Mutation Rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}