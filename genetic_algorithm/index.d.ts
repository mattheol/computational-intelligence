export interface Individual {
    chromosome: any;
    mutate(position: number): void;
}
