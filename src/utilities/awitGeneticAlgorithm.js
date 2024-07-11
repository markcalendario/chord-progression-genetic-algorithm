export default class AwitGeneticAlgorithm {
  MAX_POPULATION = 10;
  POPULATION_SIZE = 35;
  POPULATION = [];
  KEY = null;
  CROSSOVER_RATE = 0.3;
  MUTATION_RATE = 0.1;

  KEY_CHORDS = {
    C: ["C", "Dm", "Em", "F", "G", "Am"],
    D: ["D", "Em", "F#m", "G", "A", "Bm"],
    E: ["E", "F#", "G#m", "A", "B", "C#m"],
    F: ["F", "Gm", "Am", "Bb", "C", "Dm"],
    G: ["G", "Am", "Bm", "C", "D", "Em"],
    A: ["A", "Bm", "C#m", "D", "E", "F#m"],
    B: ["B", "C#m", "D#m", "E", "F#", "G#m"]
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

  FITNESS_HISTORY = [];

  constructor() {
    const keys = this.getAllKeys();
    this.KEY = keys[Math.floor(Math.random() * keys.length)];
  }

  getAllKeys() {
    return Object.keys(this.KEY_CHORDS);
  }

  getAllChords() {
    let allChords = Object.values(this.KEY_CHORDS).flat();
    return [...new Set(allChords)];
  }

  getAllChordsOfKey(musicKey) {
    return this.KEY_CHORDS[musicKey];
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
    const b = this.calculateFitness(progressionB);
    return a - b;
  }

  crossover(progressionA, progressionB) {
    const crossoverPoint = this.POPULATION_SIZE * this.CROSSOVER_RATE;
    const childA = [...progressionA];
    const childB = [...progressionB];

    for (let i = 0; i < crossoverPoint; i++) {
      const temp = childA[i];
      childA[i] = childB[i];
      childB[i] = temp;
    }

    return [childA, childB];
  }

  mutate(progression) {
    let mutated = [...progression];
    const mutationCount = this.POPULATION_SIZE * this.MUTATION_RATE;
    const targetIndices = [];

    for (let i = 0; i < mutationCount; i++) {
      const rand = Math.floor(Math.random() * progression.length);
      targetIndices.push(rand);
    }

    for (const targetIndex of targetIndices) {
      const allChords = this.getAllChords();
      const rand = Math.floor(Math.random() * allChords.length);
      const chordReplacement = allChords[rand];
      mutated[targetIndex] = chordReplacement;
    }

    return mutated;
  }

  async start() {
    this.POPULATION = this.generateRandomPopulation();
    let currentGeneration = 0;
    let bestProgression = null;

    return await new Promise((resolve) => {
      for (;;) {
        this.POPULATION = this.POPULATION.sort((a, b) =>
          this.sortFitness(a, b)
        );

        const parentA = this.POPULATION[0];
        const parentB = this.POPULATION[1];

        const bestFitness = this.calculateFitness(parentA);

        this.FITNESS_HISTORY.push(bestFitness);

        if (bestFitness === 0) {
          bestProgression = parentA;
          break;
        }

        let [childA, childB] = this.crossover(parentA, parentB);
        childA = this.mutate(childA);
        childB = this.mutate(childB);

        this.POPULATION[this.POPULATION.length - 1] = childA;
        this.POPULATION[this.POPULATION.length - 2] = childB;

        currentGeneration++;
      }

      resolve(bestProgression);
    });
  }
}
