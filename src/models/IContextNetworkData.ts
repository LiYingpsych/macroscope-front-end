import IWord from "./IWord";

export default interface IContextNetworkData {
    readonly primaryWord: IWord;
    readonly contextNetwork: IContextNetwork;
}

interface IContextNetwork {
    readonly nodes: IContextNetworkNode[];
    readonly edges: IContextNetworkEdge[];
}

export interface IContextNetworkNode {
    readonly word: IWord;
    readonly group: number;
    readonly size: number;
}

export interface IContextNetworkEdge {
    readonly source: string;
    readonly target: string;
    readonly weight: number;
}
