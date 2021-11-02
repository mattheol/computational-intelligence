import { BIndividual } from './BIndividual';
import * as fs from 'fs';

export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function notNullAndNotUndefined<T>(x: T | undefined): x is T {
    return x != undefined;
}

export function KPFitnessFun(individual: BIndividual) {
    const { chromosome } = individual;
    const [totalWeight, fitness] = chromosome.reduce(
        (acc, gen, i) => {
            if (gen === 1) {
                acc[0] += DataProvider.WEIGHTS[i];
                acc[1] += DataProvider.PROFITS[i];
            }
            return acc;
        },
        [0, 0],
    );
    return totalWeight <= DataProvider.CAPACITY ? fitness : 0;
}

export function BCrossover1(parent1: BIndividual, parent2: BIndividual): Array<BIndividual> {
    const splitPoint = randomIntFromInterval(1, DataProvider.SIZE_OF_CHROMOSOME - 1);
    return [
        new BIndividual([
            ...parent1.chromosome.slice(0, splitPoint),
            ...parent2.chromosome.slice(splitPoint, DataProvider.SIZE_OF_CHROMOSOME),
        ]),
        new BIndividual([
            ...parent2.chromosome.slice(0, splitPoint),
            ...parent1.chromosome.slice(splitPoint, DataProvider.SIZE_OF_CHROMOSOME),
        ]),
    ];
}

export function BCrossover2(parent1: BIndividual, parent2: BIndividual): Array<BIndividual> {
    const splitPoint1 = randomIntFromInterval(1, DataProvider.SIZE_OF_CHROMOSOME - 1);
    let splitPoint2 = randomIntFromInterval(1, DataProvider.SIZE_OF_CHROMOSOME - 1);
    while (splitPoint2 == splitPoint1) {
        splitPoint2 = randomIntFromInterval(1, DataProvider.SIZE_OF_CHROMOSOME - 1);
    }
    if (splitPoint1 < splitPoint2) {
        return [
            new BIndividual([
                ...parent1.chromosome.slice(0, splitPoint1),
                ...parent2.chromosome.slice(splitPoint1, splitPoint2),
                ...parent1.chromosome.slice(splitPoint2, DataProvider.SIZE_OF_CHROMOSOME),
            ]),
            new BIndividual([
                ...parent2.chromosome.slice(0, splitPoint1),
                ...parent1.chromosome.slice(splitPoint1, splitPoint2),
                ...parent2.chromosome.slice(splitPoint2, DataProvider.SIZE_OF_CHROMOSOME),
            ]),
        ];
    } else {
        return [
            new BIndividual([
                ...parent1.chromosome.slice(0, splitPoint2),
                ...parent2.chromosome.slice(splitPoint2, splitPoint1),
                ...parent1.chromosome.slice(splitPoint1, DataProvider.SIZE_OF_CHROMOSOME),
            ]),
            new BIndividual([
                ...parent2.chromosome.slice(0, splitPoint2),
                ...parent1.chromosome.slice(splitPoint2, splitPoint1),
                ...parent2.chromosome.slice(splitPoint1, DataProvider.SIZE_OF_CHROMOSOME),
            ]),
        ];
    }
}

export function BUniformCrossover(parent1: BIndividual, parent2: BIndividual): Array<BIndividual> {
    const mask = Array.from({ length: DataProvider.SIZE_OF_CHROMOSOME }, () =>
        Math.random() <= 0.5 ? 0 : 1,
    ) as Array<0 | 1>;

    const chromosome1 = [] as Array<0 | 1>;
    const chromosome2 = [] as Array<0 | 1>;
    mask.forEach((bit, i) => {
        if (bit === 0) {
            chromosome1.push(parent1.chromosome[i]);
            chromosome2.push(parent2.chromosome[i]);
        } else {
            chromosome1.push(parent2.chromosome[i]);
            chromosome2.push(parent1.chromosome[i]);
        }
    });
    return [new BIndividual(chromosome1), new BIndividual(chromosome2)];
}

export function loadData() {
    const result = fs.readFileSync('./data/dataset.txt').toString();
    const data = result.split('\n').map((line) => line.split(' '));
    DataProvider.SIZE_OF_CHROMOSOME = +data[0][0];
    DataProvider.CAPACITY = +data[0][1];
    DataProvider.WEIGHTS = data.slice(1).map((lineData) => +lineData[1]);
    DataProvider.PROFITS = data.slice(1).map((lineData) => +lineData[0]);
}

export class DataProvider {
    static SIZE_OF_CHROMOSOME: number;
    static CAPACITY: number;
    static PROFITS: Array<number>;
    static WEIGHTS: Array<number>;
}
