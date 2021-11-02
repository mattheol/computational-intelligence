import { SelectionType } from '.';
import { GeneticAlgorithm } from './Algorithm';
import { BIndividual } from './BIndividual';
import { BCrossover1, BCrossover2, KPFitnessFun, loadData } from './helpers';

loadData();

// const MUTATE_PROPABILITES = [0, 0.001, 0.005, 0.01, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

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

// const TOURNAMENT_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

// const CROSSOVER_FUNCTIONS: Array<
//     (parent1: BIndividual, parent2: BIndividual) => Array<BIndividual>
// > = [BCrossover1, BCrossover2];

// CROSSOVER_FUNCTIONS.forEach((crossoverFun) => {
//     const bestIndividuals: Array<BIndividual> = [];
//     for (let i = 0; i < 1000; i++) {
//         const res = GeneticAlgorithm(KPFitnessFun, crossoverFun);
//         const bestIndividual = res.reduce((prev, current) =>
//             KPFitnessFun(prev.bestIndividual) > KPFitnessFun(current.bestIndividual)
//                 ? prev
//                 : current,
//         ).bestIndividual;
//         bestIndividuals.push(bestIndividual);
//     }
//     const sum = bestIndividuals.reduce((sum, curr) => (sum += KPFitnessFun(curr)), 0);
//     console.log(crossoverFun.name + ' ' + (sum / bestIndividuals.length).toLocaleString());
// });

// const CROSSOVER_PROPABILITES_2 = [0, 0.01, 0.3];

// const mutateResults: Array<Array<{ bestIndividual: BIndividual; avg: number }>> = [];

// MUTATE_PROBABILITES_2.forEach((mutatePropability, i) => {
//     mutateResults.push(GeneticAlgorithm(KPFitnessFun, BCrossover1, { mutatePropability }));
// });

// for (let i = 0; i < mutateResults[0].length; i++) {
//     let line = i + 1 + '';
//     MUTATE_PROPABILITES_2.forEach((_, index) => {
//         line +=
//             ' ' +
//             KPFitnessFun(mutateResults[index][i].bestIndividual).toLocaleString() +
//             ' ' +
//             mutateResults[index][i].avg.toLocaleString();
//     });
//     console.log(line);
// }

const CROSSOVER_PROPABILITES_2 = [0.5, 1];

const crossoverResults: Array<Array<{ bestIndividual: BIndividual; avg: number }>> = [];

CROSSOVER_PROPABILITES_2.forEach((crossoverPropability, i) => {
    crossoverResults.push(GeneticAlgorithm(KPFitnessFun, BCrossover1, { crossoverPropability }));
});

for (let i = 0; i < crossoverResults[0].length; i++) {
    let line = i + 1 + '';
    CROSSOVER_PROPABILITES_2.forEach((_, index) => {
        line +=
            ' ' +
            KPFitnessFun(crossoverResults[index][i].bestIndividual).toLocaleString() +
            ' ' +
            crossoverResults[index][i].avg.toLocaleString();
    });
    console.log(line);
}
