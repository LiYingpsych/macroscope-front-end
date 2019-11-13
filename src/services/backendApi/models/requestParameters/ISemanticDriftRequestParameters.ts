import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface ISemanticDriftRequestParameters extends DefaultRequestParameters {
    startYear: number;
    endYear: number;
    numberOfYearsInInterval: number;
    numberOfClosestWords: number;
}
