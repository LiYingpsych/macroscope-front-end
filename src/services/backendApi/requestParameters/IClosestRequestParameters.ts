export enum ClosestSearchMethod {
    SVD = "SVD",
    SGNS = "SGNS"
}

export interface IClosestRequestParameters {
    searchTerms: string[];
    year: number;
    numberOfClosestWords?: number;
    method?: ClosestSearchMethod;
}
