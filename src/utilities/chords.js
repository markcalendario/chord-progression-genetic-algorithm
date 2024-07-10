class AwitGeneticAlgorithm {
  MAX_POPULATION = 10;
  POPULATION_SIZE = 10;
  POPULATION = [];
  GENERATIONS = 100;
  KEY = null;

  KEY_CHORDS = {
    C: ["C", "Dm", "Em", "F", "G", "Am"],
    D: ["D", "Em", "F#m", "G", "A", "Bm"],
    E: ["E", "F#", "G#m", "A", "B", "C#m"]
  };

  PROGRESSION_RULES = {
    // This program uses numeric values instead of roman numerals
    // to represent music chords.

    // Current: [N Possible Next]
    0: [0, 1, 2, 3, 4, 5],
    1: [2, 3, 4],
    2: [0, 1, 3, 5],
    3: [0, 2, 4, 5],
    4: [0, 3, 5],
    5: [0, 1, 3, 4]
  };

  constructor() {
    // Randomize Key
    const possibleKeys = Object.keys(this.KEY_CHORDS);
    this.KEY = possibleKeys[Math.floor(Math.random() * possibleKeys.length)];
  }

  getAllChords() {
    let allChords = Object.values(this.KEY_CHORDS).flat();
    return [...new Set(allChords)];
  }

  generateRandomPopulation() {
    const allChords = this.getAllChords();

    let progressions = [];

    for (let i = 0; i < this.MAX_POPULATION; i++) {
      const progression = [];

      for (let j = 0; j < this.POPULATION_SIZE; j++) {
        const rand = Math.floor(Math.random() * allChords.length);
        const randChord = allChords[rand];
        progression.push(randChord);
      }

      progressions.push(progression);
    }

    return progressions;
  }

  calculateFitness(progression) {
    let fitness = 0;

    // Penalize the progression if it violates the progression rule
    for (let i = 0; i < progression.length - 1; i++) {
      const currentChord = progression[i];
      const nextChord = progression[i + 1];

      const currentChordIdx = this.KEY_CHORDS[this.KEY].indexOf(currentChord);
      const nextChordIdx = this.KEY_CHORDS[this.KEY].indexOf(nextChord);

      // Penalize if the chord is not a member of the key
      if (currentChordIdx < 0) {
        fitness += 1;
        continue;
      }

      // Check if the current chord satisfies the next chord
      // based on the progression rules
      if (
        this.PROGRESSION_RULES[currentChordIdx].indexOf(nextChordIdx) === -1
      ) {
        fitness += 1;
      }
    }

    return fitness;
  }

  sortFitness(progressionA, progressionB) {
    const a = this.calculateFitness(progressionA);
    console.log(a, progressionA);
    const b = this.calculateFitness(progressionB);
    console.log(b, progressionB);
    return a - b;
  }

  start() {
    this.POPULATION = this.generateRandomPopulation();
    this.POPULATION = this.POPULATION.sort((a, b) => this.sortFitness(a, b));
    console.log(this.KEY);
    let currentGeneration = 0;
    while (currentGeneration < this.GENERATIONS) {
      currentGeneration++;
    }
  }
}

new AwitGeneticAlgorithm().start();
