import IWordResponse from "./IWordResponse";

export default interface ISynonymNetworkResponse {
    readonly primaryWord: IWordResponse;
    readonly synonymNetwork: ISynonymNetwork;
}

interface ISynonymNetwork {
    readonly nodes: ISynonymNetworkNode[];
    readonly edges: ISynonymNetworkEdge[];
}

interface ISynonymNetworkNode {
    readonly word: IWordResponse;
    readonly group: number;
}

interface ISynonymNetworkEdge {
    readonly source: string;
    readonly target: string;
    readonly weight: number;
}
