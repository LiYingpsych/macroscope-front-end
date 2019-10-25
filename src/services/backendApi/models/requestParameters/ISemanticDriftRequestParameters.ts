export default interface ISemanticDriftRequestParameters {
    searchTerm: string;
    startYear: number;
    endYear: number;
    numberOfYearsInInterval: number;
    numberOfClosestWords: number;
}
