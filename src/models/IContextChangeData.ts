import IWord from "./IWord";

export default interface IContextChangeData {
    items: IContextChangeResponseItem[];
}

interface IContextChangeResponseItem {
    readonly primaryWord: IWord;
    readonly contextChangeWords: IContextChangeWord[];
}

interface IContextChangeWord {
    readonly word: IWord;
    readonly dif: number;
}
