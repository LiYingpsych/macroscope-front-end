import IWordResponse from "./IWordResponse";
import ICoordResponse from "./ICoordResponse";

export default interface IFrequencyResponse {
    readonly items: IFrequencyResponseItem[];
}

interface IFrequencyResponseItem {
    readonly primaryWord: IWordResponse;
    readonly frequencyCoords: IFrequencyCoords;
}

interface IFrequencyCoords {
    readonly matchFullWord: ICoordResponse[];
    readonly matchStart: ICoordResponse[];
    readonly matchMiddle: ICoordResponse[];
    readonly matchEnd: ICoordResponse[];
}
