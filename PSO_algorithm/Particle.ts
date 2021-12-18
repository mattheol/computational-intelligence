import { DataProvider } from '../genetic_algorithm/helpers';
import { KPFitnessFun, Sigmoid } from './functions';

export class Particle {
    static maxVelocity = 4;
    static minVelocity = -4;
    public fitness = 0;
    public position: Array<0 | 1>;
    public velocity: number[];
    bestLocalSolution: Particle;

    constructor() {
        this.velocity = [];
        this.position = [];
        for (let i = 0; i < DataProvider.NUMBER_OF_ITEMS; i++) {
            this.position[i] = Math.random() <= 0.5 ? 0 : 1;
            this.velocity[i] =
                Particle.minVelocity +
                Math.random() * (Particle.maxVelocity - Particle.minVelocity);
        }
        this.fitness = KPFitnessFun(this.position);
        this.bestLocalSolution = JSON.parse(JSON.stringify(this));
    }

    updateVelocity(bestGlobalSolution: Particle) {
        const w = 0.8,
            c1 = 2, //1-3
            c2 = 2; //1-3
        this.velocity.forEach((vel, i) => {
            const r_l = Math.random();
            const r_g = Math.random();
            this.velocity[i] =
                w * vel +
                c1 * r_l * (this.bestLocalSolution.position[i] - this.position[i]) +
                c2 * r_g * (bestGlobalSolution.position[i] - this.position[i]);
            if (this.velocity[i] > Particle.maxVelocity) {
                this.velocity[i] = Particle.maxVelocity;
                return;
            }
            if (this.velocity[i] < Particle.minVelocity) {
                this.velocity[i] = Particle.minVelocity;
            }
        });
    }

    updatePosition() {
        this.position.forEach((pos, i) => {
            if (Math.random() > Sigmoid(this.velocity[i])) {
                this.position[i] = 0;
            } else {
                this.position[i] = 1;
            }
        });
        this.fitness = KPFitnessFun(this.position);
        if (this.fitness > this.bestLocalSolution.fitness) {
            this.bestLocalSolution = JSON.parse(JSON.stringify(this));
        }
    }
}
