import { BIndividual } from './BIndividual';
import { CAPACITY, PROFITS, SIZE_OF_CHROMOSOME, WEIGHTS } from './constants';

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
                acc[0] += WEIGHTS[i];
                acc[1] += PROFITS[i];
            }
            return acc;
        },
        [0, 0],
    );
    return totalWeight <= CAPACITY ? fitness : 0;
}

export function BCross1(parent1: BIndividual, parent2: BIndividual): Array<BIndividual> {
    const splitPoint = randomIntFromInterval(1, SIZE_OF_CHROMOSOME - 1);
    return [
        new BIndividual([
            ...parent1.chromosome.slice(0, splitPoint),
            ...parent2.chromosome.slice(splitPoint, SIZE_OF_CHROMOSOME),
        ]),
        new BIndividual([
            ...parent2.chromosome.slice(0, splitPoint),
            ...parent1.chromosome.slice(splitPoint, SIZE_OF_CHROMOSOME),
        ]),
    ];
}
