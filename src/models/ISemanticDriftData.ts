import IWord from "./IWord";
import ICartesianCoordinate from "./ICartesianCoordinate";

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
    readonly coord: ICartesianCoordinate<number, number>;
}

interface IContextWordPoint {
    readonly word: IWord;
    readonly coord: ICartesianCoordinate<number, number>;
}
