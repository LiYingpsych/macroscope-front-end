import IWordResponse from "./IWordResponse";
import INodeResponse from "./INodeResponse";
import IEdgeResponse from "./IEdgeResponse";

export default interface ISynonymNetworkResponse {
    readonly primaryWord: IWordResponse;
    readonly synonymNetwork: ISynonymNetwork;
}

interface ISynonymNetwork {
    readonly nodes: INodeResponse[];
    readonly edges: IEdgeResponse[];
}
