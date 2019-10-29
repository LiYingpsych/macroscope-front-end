import IWord from "./IWord";

export default interface IContextChangeData {
    readonly primaryWord: IWord;
    readonly increasingWords: IContextChangeWord[];
    readonly decreasingWords: IContextChangeWord[];
}

export interface IContextChangeWord {
    readonly word: IWord;
    readonly dif: number;
}
