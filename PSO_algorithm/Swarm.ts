import { Particle } from './Particle';

export class Swarm {
    public particles: Array<Particle>;
    public bestGlobalSolution: Particle;

    constructor(size: number) {
        this.particles = Array.from({ length: size }, () => new Particle());
        this.bestGlobalSolution = this.particles[0];
        this.updateGlobalBestSolution();
    }

    updateParticles() {
        this.particles.forEach((particle) => {
            particle.updateVelocity(this.bestGlobalSolution);
            particle.updatePosition();
        });
        this.updateGlobalBestSolution();
    }

    updateGlobalBestSolution() {
        let newBestSolution: Particle | undefined;
        this.particles.forEach((particle) => {
            if (particle.fitness > this.bestGlobalSolution.fitness) {
                newBestSolution = particle;
            }
        });
        if (newBestSolution) {
            this.bestGlobalSolution = JSON.parse(
                JSON.stringify({
                    fitness: newBestSolution.fitness,
                    position: newBestSolution.position,
                    velocity: newBestSolution.velocity,
                }),
            );
        }
    }
}
