import IWord from "./IWord";

export default interface IContextChangeData {
    readonly primaryWord: IWord;
    readonly contextChangeWords: IContextChangeWord[];
}

interface IContextChangeWord {
    readonly word: IWord;
    readonly dif: number;
}
