import IWord from "./IWord";

export default interface ISynonymNetworkData {
    readonly primaryWord: IWord;
    readonly synonymNetwork: ISynonymNetwork;
}

interface ISynonymNetwork {
    readonly nodes: ISynonymNetworkNode[];
    readonly edges: ISynonymNetworkEdge[];
}

export interface ISynonymNetworkNode {
    readonly word: IWord;
    readonly group: number;
}

export interface ISynonymNetworkEdge {
    readonly source: string;
    readonly target: string;
    readonly weight: number;
}
