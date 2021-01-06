//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA (CrossOver)
//      -- mutate DNA

function newChar() {
  let c = floor(random(63, 122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

class DNA {
  constructor(num) {
    // The genetic sequence
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; ++i) {
      this.genes[i] = newChar(); // Pick from range of chars
    }
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("");
  }

  // Fitness Function
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
  }

  // Crossover
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length);

    // One point crossover
    let midpoint = floor(random(this.genes.length));

    for (let i = 0; i < this.genes.length; i++) {
      if (midpoint < i) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Mutation
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}