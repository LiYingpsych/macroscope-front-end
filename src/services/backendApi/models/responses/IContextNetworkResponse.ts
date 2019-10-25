import IWordResponse from "./IWordResponse";

export default interface IContextNetworkResponse {
    readonly primaryWord: IWordResponse;
    readonly contextNetwork: IContextNetwork;
}

interface IContextNetwork {
    readonly nodes: IContextNetworkNode[];
    readonly edges: IContextNetworkEdge[];
}

interface IContextNetworkNode {
    readonly word: IWordResponse;
    readonly group: number;
    readonly size: number;
}

interface IContextNetworkEdge {
    readonly source: string;
    readonly target: string;
    readonly weight: number;
}
