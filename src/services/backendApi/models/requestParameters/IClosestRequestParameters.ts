import ClosestSearchMethod from "./ClosestSearchMethod";

export default interface IClosestRequestParameters {
    searchTerm: string;
    year: number;
    numberOfClosestWords: number;
    method?: ClosestSearchMethod;
}
