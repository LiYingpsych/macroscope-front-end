import ICoord from "./ICoord";
import IWord from "./IWord";

export default interface ISentimentData {
    readonly primaryWord: IWord;
    readonly sentimentCoords: ICoord[];
}
