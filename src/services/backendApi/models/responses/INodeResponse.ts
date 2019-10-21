import IWordResponse from "./IWordResponse";

export default interface INodeResponse {
    readonly word: IWordResponse;
    readonly group: number;
}
