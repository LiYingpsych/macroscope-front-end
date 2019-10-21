import IWordResponse from "./IWordResponse";

export default interface IClosestDataResponse {
    readonly items: IClosestResponseItem[];
}

interface IClosestResponseItem {
    readonly primaryWord: IWordResponse;
    readonly closestWords: IClosestWord[];
}

interface IClosestWord {
    readonly word: IWordResponse;
    readonly score: number;
}
