import ClosestSearchMethod from "./ClosestSearchMethod";
import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface IClosestRequestParameters extends DefaultRequestParameters {
    year: number;
    numberOfClosestWords: number;
    method: ClosestSearchMethod;
}
