import { ClosestSearchMethod } from "./ClosestSearchMethod";

export interface IClosestRequestParameters {
    searchTerms: string[];
    year: number;
    numberOfClosestWords?: number;
    method?: ClosestSearchMethod;
}
