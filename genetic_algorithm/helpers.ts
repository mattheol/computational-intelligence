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

export function BCross1(parent1: BIndividual, parent2: BIndividual): Array<BIndividual> {
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

export function loadData() {
    const result = fs.readFileSync('./data/dataset3.txt').toString();
    const data = result.split('\n').map((line) => line.split(' '));
    DataProvider.SIZE_OF_CHROMOSOME = +data[0][0];
    DataProvider.CAPACITY = +data[0][1];
    DataProvider.WEIGHTS = data.slice(1).map((lineData) => +lineData[0]);
    DataProvider.PROFITS = data.slice(1).map((lineData) => +lineData[1]);
}

export class DataProvider {
    static SIZE_OF_CHROMOSOME: number;
    static CAPACITY: number;
    static PROFITS: Array<number>;
    static WEIGHTS: Array<number>;
}
