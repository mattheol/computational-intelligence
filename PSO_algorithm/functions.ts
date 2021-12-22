import { DataProvider } from '../genetic_algorithm/helpers';

export const Sigmoid = (velocity: number) => {
    return 1 / (1 + Math.exp(-velocity));
};

export const KPFitnessFun = (solution: Array<0 | 1>) => {
    const [totalWeight, fitness] = solution.reduce(
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
};

export const randomNumberFromInterval = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};
