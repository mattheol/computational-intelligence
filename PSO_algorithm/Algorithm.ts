import { loadData } from '../genetic_algorithm/helpers';
import { Swarm } from './Swarm';

// loadData();

export function PSO({
    swarmSize,
    numberOfIterations,
}: {
    swarmSize?: number;
    numberOfIterations?: number;
}) {
    const NUMBER_OF_ITERATIONS = numberOfIterations ?? 100;
    const SWARM_SIZE = swarmSize ?? 50;
    const swarm = new Swarm(SWARM_SIZE);
    // const avg =
    //     swarm.particles.reduce((prev, curr) => (prev += curr.fitness), 0) / swarm.particles.length;
    // console.log(swarm.bestGlobalSolution.fitness + ' ' + avg.toLocaleString());

    for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
        swarm.updateParticles();
        // const avg =
        //     swarm.particles.reduce((prev, curr) => (prev += curr.fitness), 0) /
        //     swarm.particles.length;
        // console.log(swarm.bestGlobalSolution.fitness + ' ' + avg.toLocaleString());
    }
    return swarm.bestGlobalSolution;
}
