import { ClosestSearchMethod } from "./ClosestSearchMethod";

export interface IClosestRequestParameters {
    searchTerm: string;
    year: number;
    numberOfClosestWords?: number;
    method?: ClosestSearchMethod;
}
