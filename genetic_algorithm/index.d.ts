export interface Individual {
    chromosome: any;
    mutate(position: number): void;
}

export type SelectionType = 'roulette' | 'tournament' | 'rank';
