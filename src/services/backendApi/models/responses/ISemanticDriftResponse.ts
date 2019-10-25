import IWordResponse from "./IWordResponse";
import ICoordResponse from "./ICoordResponse";

export default interface ISemanticDriftResponse {
    readonly primaryWord: IWordResponse;
    readonly semanticDrift: ISemanticDrift;
}

interface ISemanticDrift {
    readonly yearPoints: IYearPoint[];
    readonly contextWordPoints: IContextWordPoint[];
}

interface IYearPoint {
    readonly year: number;
    readonly coord: ICoordResponse;
}

interface IContextWordPoint {
    readonly word: IWordResponse;
    readonly coord: ICoordResponse;
}
