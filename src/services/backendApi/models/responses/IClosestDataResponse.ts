import { IWord } from "./IWord";

export interface IClosestDataResponse {
    readonly items: IClosestResponseItem[];
}

interface IClosestResponseItem {
    readonly primaryWord: IWord;
    readonly closestWords: IClosestWord[];
}

interface IClosestWord {
    readonly word: IWord;
    readonly score: number;
}
