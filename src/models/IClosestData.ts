import IWord from "./IWord";

export default interface IClosestData {
    readonly primaryWord: IWord;
    readonly closestWords: IClosestWord[];
}

interface IClosestWord {
    readonly word: IWord;
    readonly score: number;
}
