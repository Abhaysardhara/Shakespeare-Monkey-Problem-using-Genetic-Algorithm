class Population {
  constructor(p, m, num) {

    this.population; // current population
    this.matingPool; // mating pool
    this.generations = 0; // Number of generations
    this.finished = false;
    this.target = p; // Target phrase
    this.mutationRate = m; // Mutation rate
    this.perfectScore = 1;

    this.best = "";

    this.population = [];
    for (let i = 0; i < num; i++) {
      this.population[i] = new DNA(this.target.length);
    }
    this.matingPool = [];
    this.calcFitness();
  }

  // Filling fitness array
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  // Generate a mating pool
  naturalSelection() {
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    for (let i = 0; i < this.population.length; i++) {
      // Scalling zero to max fitness in zero to one range
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Create a new generation
  generate() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }


  getBest() {
    return this.best;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let highest = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > highest) {
        index = i;
        highest = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (highest === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  allPhrases() {
    let everything = "";

    let limit = this.population.length;

    for (let i = 0; i < limit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
}