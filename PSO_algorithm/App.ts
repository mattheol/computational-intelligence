import { loadData } from '../genetic_algorithm/helpers';
import { PSO } from './Algorithm';
import { Particle } from './Particle';

// const bestSolutions: Array<Particle> = [];
// for (let i = 0; i < 1; i++) {
//     const bestSolution = PSO({});
//     bestSolutions.push(bestSolution);
// }
// const avg = bestSolutions.reduce((sum, curr) => (sum += curr.fitness), 0) / 100;
// console.log(avg.toLocaleString());

// loadData();
// const start = Date.now();
// PSO({});
// const end = Date.now();
// console.log(end - start);

PSO({});
