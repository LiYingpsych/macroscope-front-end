import IWord from "./IWord";

export default interface INode {
    readonly word: IWord;
    readonly group: number;
}
