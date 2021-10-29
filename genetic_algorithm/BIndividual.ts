import { Individual } from '.';
import { randomIntFromInterval } from './helpers';

export class BIndividual implements Individual {
    constructor(public chromosome: Array<0 | 1>) {}

    mutate() {
        const mutateLocus = randomIntFromInterval(0, this.chromosome.length - 1);
        this.chromosome[mutateLocus] = this.chromosome[mutateLocus] === 1 ? 0 : 1;
    }
}
