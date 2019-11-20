import IDefaultRequestParameters from "./IDefaultRequestParameters";

export default interface ISemanticDriftRequestParameters extends IDefaultRequestParameters {
    startYear: number;
    endYear: number;
    numberOfYearsInInterval: number;
    numberOfClosestWords: number;
}
