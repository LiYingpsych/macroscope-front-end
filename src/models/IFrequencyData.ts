import IWord from "./IWord";
import ICartesianCoordinate from "./ICartesianCoordinate";

export default interface IFrequencyData {
    readonly primaryWord: IWord;
    readonly frequencyCoords: IFrequencyCoords;
}

interface IFrequencyCoords {
    readonly matchFullWord: ICartesianCoordinate<number, number>[];
    readonly matchStart: ICartesianCoordinate<number, number>[];
    readonly matchMiddle: ICartesianCoordinate<number, number>[];
    readonly matchEnd: ICartesianCoordinate<number, number>[];
}
