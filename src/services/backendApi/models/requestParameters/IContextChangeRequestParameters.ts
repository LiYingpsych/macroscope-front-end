import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface IContextChangeRequestParameters extends DefaultRequestParameters {
    startYear: number;
    endYear: number;
    numberOfContextWords: number;
}
