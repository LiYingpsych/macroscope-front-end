import IDefaultRequestParameters from "./IDefaultRequestParameters";

export default interface IContextChangeRequestParameters extends IDefaultRequestParameters {
    startYear: number;
    endYear: number;
    numberOfContextWords: number;
}
