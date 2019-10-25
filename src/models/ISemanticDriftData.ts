import IWord from "./IWord";
import ICoord from "./ICoord";

export default interface ISemanticDriftData {
    readonly primaryWord: IWord;
    readonly semanticDrift: ISemanticDrift;
}

interface ISemanticDrift {
    readonly yearPoints: IYearPoint[];
    readonly contextWordPoints: IContextWordPoint[];
}

interface IYearPoint {
    readonly year: number;
    readonly coord: ICoord;
}

interface IContextWordPoint {
    readonly word: IWord;
    readonly coord: ICoord;
}
