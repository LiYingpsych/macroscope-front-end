import IWord from "./IWord";
import IEdge from "./IEdge";
import INode from "./INode";

export default interface ISynonymNetworkData {
    readonly primaryWord: IWord;
    readonly synonymNetwork: ISynonymNetwork;
}

interface ISynonymNetwork {
    readonly nodes: INode[];
    readonly edges: IEdge[];
}
