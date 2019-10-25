import IWordResponse from "./IWordResponse";

export default interface IContextChangeResponse {
    items: IContextChangeResponseItem[];
}

interface IContextChangeResponseItem {
    readonly primaryWord: IWordResponse;
    readonly contextChangeWords: IContextChangeWord[];
}

interface IContextChangeWord {
    readonly word: IWordResponse;
    readonly dif: number;
}
