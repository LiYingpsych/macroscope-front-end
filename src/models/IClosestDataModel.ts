import { IWordModel } from "./IWordModel";

export interface IClosestDataModel {
    readonly primaryWord: IWordModel;
    readonly closestWords: IClosestWordModel[];
}

interface IClosestWordModel {
    readonly word: IWordModel;
    readonly score: number;
}
