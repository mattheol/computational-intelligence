import { BIndividual } from './BIndividual';
import {
    DEFAULT_CROSSOVER_PROPABILITY,
    DEFAULT_MUTATE_PROPABILITY,
    DEFAULT_NUMBER_OF_ITERATIONS,
    DEFAULT_SIZE_OF_POPULATION,
} from './constants';
import { DataProvider, notNullAndNotUndefined, randomIntFromInterval } from './helpers';

export function GeneticAlgorithm(
    fitnessFun: (individual: BIndividual) => number,
    crossoverFun: (parent1: BIndividual, parent2: BIndividual) => Array<BIndividual>,
    params?: {
        crossoverPropability?: number;
        mutatePropability?: number;
        sizeOfPopulation?: number;
        numberOfIterations?: number;
    },
) {
    const crossoverPropability = params?.crossoverPropability || DEFAULT_CROSSOVER_PROPABILITY;
    const mutatePropablitiy = params?.mutatePropability || DEFAULT_MUTATE_PROPABILITY;
    const sizeOfPopulation = params?.sizeOfPopulation || DEFAULT_SIZE_OF_POPULATION;
    const numberOfIterations = params?.numberOfIterations || DEFAULT_NUMBER_OF_ITERATIONS;
    const populationStats: Array<{ bestIndividual: BIndividual; avg: number }> = [];

    let population = Array.from(
        { length: sizeOfPopulation },
        () =>
            new BIndividual(
                Array.from({ length: DataProvider.SIZE_OF_CHROMOSOME }, () =>
                    Math.random() <= 0.5 ? 0 : 1,
                ) as Array<0 | 1>,
            ),
    );

    let fitnessSum = 0;
    let rouletteEntries: Array<{ fitness: number; min: number; max: number; index: number }> = [];
    for (let i = 0; i < numberOfIterations; i++) {
        if (i !== 0) {
            const newPopulation: BIndividual[] = [];
            while (newPopulation.length < population.length) {
                const rouletteRandom1 = randomIntFromInterval(0, fitnessSum);
                const rouletteRandom2 = randomIntFromInterval(0, fitnessSum);
                const parent1 =
                    population[
                        rouletteEntries.find(
                            (entry) => entry.min <= rouletteRandom1 && rouletteRandom1 <= entry.max,
                        )!.index
                    ];
                const parent2 =
                    population[
                        rouletteEntries.find(
                            (entry) => entry.min <= rouletteRandom2 && rouletteRandom2 <= entry.max,
                        )!.index
                    ];
                const crossRandom = Math.random();
                if (crossRandom <= crossoverPropability) {
                    newPopulation.push(...crossoverFun(parent1, parent2));
                } else {
                    newPopulation.push(
                        new BIndividual([...parent1.chromosome]),
                        new BIndividual([...parent2.chromosome]),
                    );
                }
            }
            newPopulation.forEach((individual) =>
                individual.chromosome.forEach((_, i) => {
                    const mutateRandom = Math.random();
                    if (mutateRandom <= mutatePropablitiy) {
                        individual.mutate(i);
                    }
                }),
            );
            population = newPopulation;
        }

        let maxFitness = 0;
        let bestIndividual = population[0];
        fitnessSum = 0;
        rouletteEntries = population
            .map((individual, i) => {
                const fitness = fitnessFun(individual);
                if (!fitness) return undefined;
                if (fitness > maxFitness) {
                    maxFitness = fitness;
                    bestIndividual = individual;
                }
                const min = fitnessSum;
                fitnessSum += fitness;
                const max = fitnessSum;
                return {
                    fitness,
                    min,
                    max,
                    index: i,
                };
            })
            .filter(notNullAndNotUndefined);

        populationStats.push({ bestIndividual, avg: fitnessSum / population.length });
    }
    return populationStats;
}
