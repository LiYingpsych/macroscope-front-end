import IWordResponse from "./IWordResponse";
import ICoordResponse from "./ICoordResponse";

export default interface ISentimentResponse {
    readonly items: ISentimentResponseItem[];
}

interface ISentimentResponseItem {
    readonly primaryWord: IWordResponse;
    readonly sentimentCoords: ICoordResponse[];
}
