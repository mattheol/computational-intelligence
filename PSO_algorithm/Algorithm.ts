import { loadData } from '../genetic_algorithm/helpers';
import { Swarm } from './Swarm';

loadData();
const NUMBER_OF_ITERATIONS = 100;
const SWARM_SIZE = 50;
const swarm = new Swarm(SWARM_SIZE);
console.log(swarm.bestGlobalSolution.fitness);
for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    swarm.updateParticles();
    console.log(swarm.bestGlobalSolution.fitness);
}
