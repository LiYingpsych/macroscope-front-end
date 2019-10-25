import IWord from "./IWord";

export default interface IContextNetworkData {
    readonly primaryWord: IWord;
    readonly contextNetwork: IContextNetwork;
}

interface IContextNetwork {
    readonly nodes: IContextNetworkNode[];
    readonly edges: IContextNetworkEdge[];
}

interface IContextNetworkNode {
    readonly word: IWord;
    readonly group: number;
    readonly size: number;
}

interface IContextNetworkEdge {
    readonly source: string;
    readonly target: string;
    readonly weight: number;
}
