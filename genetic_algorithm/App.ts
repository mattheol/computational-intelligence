import { SelectionType } from '.';
import { GeneticAlgorithm } from './Algorithm';
import { BIndividual } from './BIndividual';
import { BCrossover1, KPFitnessFun, loadData } from './helpers';

loadData();

// const MUTATE_PROPABILITES = [0, 0.01, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

// MUTATE_PROPABILITES.forEach((mutatePropability) => {
//     const bestIndividuals: Array<BIndividual> = [];
//     for (let i = 0; i < 1000; i++) {
//         const res = GeneticAlgorithm(KPFitnessFun, BCrossover1, { mutatePropability });
//         const bestIndividual = res.reduce((prev, current) =>
//             KPFitnessFun(prev.bestIndividual) > KPFitnessFun(current.bestIndividual)
//                 ? prev
//                 : current,
//         ).bestIndividual;
//         bestIndividuals.push(bestIndividual);
//     }
//     const sum = bestIndividuals.reduce((sum, curr) => (sum += KPFitnessFun(curr)), 0);
//     console.log(
//         mutatePropability.toLocaleString() + ' ' + (sum / bestIndividuals.length).toLocaleString(),
//     );
// });

// const CROSSOVER_PROPABILITIES = [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];

// CROSSOVER_PROPABILITIES.forEach((crossoverPropability) => {
//     const bestIndividuals: Array<BIndividual> = [];
//     for (let i = 0; i < 1000; i++) {
//         const res = GeneticAlgorithm(KPFitnessFun, BCrossover1, { crossoverPropability });
//         const bestIndividual = res.reduce((prev, current) =>
//             KPFitnessFun(prev.bestIndividual) > KPFitnessFun(current.bestIndividual)
//                 ? prev
//                 : current,
//         ).bestIndividual;
//         bestIndividuals.push(bestIndividual);
//     }
//     const sum = bestIndividuals.reduce((sum, curr) => (sum += KPFitnessFun(curr)), 0);
//     console.log(
//         crossoverPropability.toLocaleString() +
//             ' ' +
//             (sum / bestIndividuals.length).toLocaleString(),
//     );
// });

// const TOURNAMENT_SIZES = [2, 3, 4, 5, 6, 7, 8];

// TOURNAMENT_SIZES.forEach((tournamentSize) => {
//     const bestIndividuals: Array<BIndividual> = [];
//     for (let i = 0; i < 1000; i++) {
//         const res = GeneticAlgorithm(KPFitnessFun, BCrossover1, {
//             tournamentSize,
//             selectionType: 'tournament',
//         });
//         const bestIndividual = res.reduce((prev, current) =>
//             KPFitnessFun(prev.bestIndividual) > KPFitnessFun(current.bestIndividual)
//                 ? prev
//                 : current,
//         ).bestIndividual;
//         bestIndividuals.push(bestIndividual);
//     }
//     const sum = bestIndividuals.reduce((sum, curr) => (sum += KPFitnessFun(curr)), 0);
//     console.log(
//         tournamentSize.toLocaleString() + ' ' + (sum / bestIndividuals.length).toLocaleString(),
//     );
// });

// const SELECTION_PARAMS: Array<{ selectionType: SelectionType } & Record<string, any>> = [
//     { selectionType: 'roulette' },
//     { selectionType: 'tournament', tournamentSize: 2 },
//     { selectionType: 'rank' },
// ];
// SELECTION_PARAMS.forEach((params) => {
//     const bestIndividuals: Array<BIndividual> = [];
//     for (let i = 0; i < 1000; i++) {
//         const res = GeneticAlgorithm(KPFitnessFun, BCrossover1, {
//             ...params,
//         });
//         const bestIndividual = res.reduce((prev, current) =>
//             KPFitnessFun(prev.bestIndividual) > KPFitnessFun(current.bestIndividual)
//                 ? prev
//                 : current,
//         ).bestIndividual;
//         bestIndividuals.push(bestIndividual);
//     }
//     const sum = bestIndividuals.reduce((sum, curr) => (sum += KPFitnessFun(curr)), 0);
//     console.log(params.selectionType + ' ' + (sum / bestIndividuals.length).toLocaleString());
// });

// const textToWrite = populationStats
//     .map(({ bestIndividual, avg }) => `${fitnessFun(bestIndividual)}\t${avg}`)
//     .join('\n');

// fs.writeFileSync('./output/file.txt', textToWrite);
