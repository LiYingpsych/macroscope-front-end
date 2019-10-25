import IWord from "./IWord";
import ICoord from "./ICoord";

export default interface IFrequencyData {
    readonly primaryWord: IWord;
    readonly frequencyCoords: IFrequencyCoords;
}

interface IFrequencyCoords {
    readonly matchFullWord: ICoord[];
    readonly matchStart: ICoord[];
    readonly matchMiddle: ICoord[];
    readonly matchEnd: ICoord[];
}
