import { DataProvider } from '../genetic_algorithm/helpers';
import { KPFitnessFun, randomNumberFromInterval, Sigmoid } from './functions';

export class Particle {
    static maxVelocity = 6;
    static minVelocity = -6;
    public fitness = 0;
    public position: Array<0 | 1>;
    public velocity: number[];
    bestLocalSolution: Particle;

    constructor() {
        this.velocity = [];
        this.position = [];
        for (let i = 0; i < DataProvider.NUMBER_OF_ITEMS; i++) {
            this.position[i] = Math.random() <= 0.5 ? 0 : 1;
            this.velocity[i] = randomNumberFromInterval(Particle.minVelocity, Particle.maxVelocity);
        }
        this.fitness = KPFitnessFun(this.position);
        this.bestLocalSolution = JSON.parse(
            JSON.stringify({
                fitness: this.fitness,
                position: this.position,
                velocity: this.velocity,
            }),
        );
    }

    updateVelocity(bestGlobalSolution: Particle) {
        const w = 0.8, // <1
            c_l = 2, //1-3
            c_g = 3; //1-3
        this.velocity.forEach((vel, i) => {
            const r_l = Math.random();
            const r_g = Math.random();
            this.velocity[i] =
                w * vel +
                c_l * r_l * (this.bestLocalSolution.position[i] - this.position[i]) +
                c_g * r_g * (bestGlobalSolution.position[i] - this.position[i]);
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
            this.bestLocalSolution = JSON.parse(
                JSON.stringify({
                    fitness: this.fitness,
                    position: this.position,
                    velocity: this.velocity,
                }),
            );
        }
    }
}
