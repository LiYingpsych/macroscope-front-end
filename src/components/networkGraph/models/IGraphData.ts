import INetworkGraphNode from "./INetworkGraphNode";
import INetworkGraphLink from "./INetworkGraphLink";

export default interface IGraphData<T> {
    nodes: INetworkGraphNode[];
    links: INetworkGraphLink<T>[];
}
