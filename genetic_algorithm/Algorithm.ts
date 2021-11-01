import { SelectionType } from '.';
import { BIndividual } from './BIndividual';
import {
    DEFAULT_CROSSOVER_PROPABILITY,
    DEFAULT_MUTATE_PROPABILITY,
    DEFAULT_NUMBER_OF_ITERATIONS,
    DEFAULT_SELECTION_TYPE,
    DEFAULT_SIZE_OF_POPULATION,
    DEFAULT_TOURNAMENT_SIZE,
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
        selectionType?: SelectionType;
        tournamentSize?: number;
    },
) {
    const crossoverPropability = params?.crossoverPropability || DEFAULT_CROSSOVER_PROPABILITY;
    const mutatePropablitiy = params?.mutatePropability || DEFAULT_MUTATE_PROPABILITY;
    const sizeOfPopulation = params?.sizeOfPopulation || DEFAULT_SIZE_OF_POPULATION;
    const numberOfIterations = params?.numberOfIterations || DEFAULT_NUMBER_OF_ITERATIONS;
    const selectionType = params?.selectionType || DEFAULT_SELECTION_TYPE;
    const tournamentSize = params?.tournamentSize || DEFAULT_TOURNAMENT_SIZE;

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
    let rankEntries: Array<{ min: number; max: number; index: number }> = [];
    for (let i = 0; i < numberOfIterations; i++) {
        if (i !== 0) {
            const newPopulation: BIndividual[] = [];
            let rankSum = 0;
            if (selectionType === 'rank') {
                rankEntries = population
                    .map((individual, i) => ({ index: i, fitness: fitnessFun(individual) }))
                    .sort((a, b) => a.fitness - b.fitness)
                    .map(({ index }, i) => {
                        rankSum++;
                        const min = rankSum;
                        rankSum += i;
                        const max = rankSum;
                        return {
                            min,
                            max,
                            index,
                        };
                    });
            }
            while (newPopulation.length < population.length) {
                let parent1: BIndividual, parent2: BIndividual;
                switch (selectionType) {
                    case 'roulette': {
                        const parents = selectParentsByRoulette(
                            population,
                            fitnessSum,
                            rouletteEntries,
                        );
                        parent1 = parents[0];
                        parent2 = parents[1];
                        break;
                    }
                    case 'tournament': {
                        const parents = selectParentsByTournament(
                            population,
                            tournamentSize,
                            fitnessFun,
                        );
                        parent1 = parents[0];
                        parent2 = parents[1];
                        break;
                    }
                    case 'rank': {
                        const parents = selectParentsByRank(population, rankEntries, rankSum);
                        parent1 = parents[0];
                        parent2 = parents[1];
                        break;
                    }
                }
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
        switch (selectionType) {
            case 'roulette': {
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
                break;
            }
            case 'tournament':
            case 'rank': {
                population.forEach((individual) => {
                    const fitness = fitnessFun(individual);
                    if (fitness > maxFitness) {
                        maxFitness = fitness;
                        bestIndividual = individual;
                    }
                    fitnessSum += fitness;
                });
                break;
            }
        }

        populationStats.push({ bestIndividual, avg: fitnessSum / population.length });
    }
    return populationStats;
}

function selectParentsByRoulette(
    population: Array<BIndividual>,
    fitnessSum: number,
    rouletteEntries: Array<{ fitness: number; min: number; max: number; index: number }>,
): [BIndividual, BIndividual] {
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
    return [parent1, parent2];
}

function selectParentsByTournament(
    population: Array<BIndividual>,
    tournamentSize: number,
    fitnessFun: (individual: BIndividual) => number,
): [BIndividual, BIndividual] {
    const parent1 = getIndividualFromTournament(population, tournamentSize, fitnessFun);
    const parent2 = getIndividualFromTournament(population, tournamentSize, fitnessFun);
    return [parent1, parent2];
}

function getIndividualFromTournament(
    population: Array<BIndividual>,
    tournamentSize: number,
    fitnessFun: (individual: BIndividual) => number,
) {
    return Array.from(
        { length: tournamentSize },
        () => population[randomIntFromInterval(0, population.length - 1)],
    ).reduce((prev, current) => (fitnessFun(prev) > fitnessFun(current) ? prev : current));
}

function selectParentsByRank(
    population: Array<BIndividual>,
    rankEntries: Array<{ min: number; max: number; index: number }>,
    rankSum: number,
): [BIndividual, BIndividual] {
    const rankRandom1 = randomIntFromInterval(1, rankSum);
    const rankRandom2 = randomIntFromInterval(1, rankSum);
    const parent1 =
        population[
            rankEntries.find((entry) => entry.min <= rankRandom1 && rankRandom1 <= entry.max)!.index
        ];
    const parent2 =
        population[
            rankEntries.find((entry) => entry.min <= rankRandom2 && rankRandom2 <= entry.max)!.index
        ];
    return [parent1, parent2];
}
