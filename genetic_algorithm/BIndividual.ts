import { Individual } from '.';

export class BIndividual implements Individual {
    constructor(public chromosome: Array<0 | 1>) {}

    mutate(position: number) {
        this.chromosome[position] = this.chromosome[position] === 1 ? 0 : 1;
    }
}
