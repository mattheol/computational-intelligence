import { BIndividual } from './BIndividual';
import {
    CROSS_PROPABILITY,
    MUTATE_PROPABILITY,
    NUMBER_OF_ITERATIONS,
    SIZE_OF_POPULATION,
} from './constants';
import {
    BCross1,
    DataProvider,
    KPFitnessFun,
    loadData,
    notNullAndNotUndefined,
    randomIntFromInterval,
} from './helpers';
import * as fs from 'fs';

loadData();
const fitnessFun = KPFitnessFun;
const crossFun = BCross1;
const populationStats: Array<{ bestIndividual: BIndividual; avg: number }> = [];

let population = Array.from(
    { length: SIZE_OF_POPULATION },
    () =>
        new BIndividual(
            Array.from({ length: DataProvider.SIZE_OF_CHROMOSOME }, () =>
                Math.random() < 0.5 ? 0 : 1,
            ) as Array<0 | 1>,
        ),
);

let fitnessSum = 0;
let rouletteEntries: Array<{ fitness: number; min: number; max: number; index: number }> = [];
for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
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
            if (crossRandom <= CROSS_PROPABILITY) {
                newPopulation.push(...crossFun(parent1, parent2));
            }
        }
        newPopulation.forEach((individual) => {
            const mutateRandom = Math.random();
            if (mutateRandom <= MUTATE_PROPABILITY) {
                individual.mutate();
            }
        });
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

const textToWrite = populationStats
    .map(({ bestIndividual, avg }) => `${fitnessFun(bestIndividual)}\t${avg}`)
    .join('\n');

fs.writeFileSync('./output/file.txt', textToWrite);
