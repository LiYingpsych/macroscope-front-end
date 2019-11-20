import ContextNetworkMethod from "./enums/ContextNetworkMethod";

export default interface IContextNetworkSettings {
    year: number;
    maximumNodes: number;
    contextRelevance: number;
    contextCohesiveness: number;
    individualWordRelevance: number;
    minimumEdges: number;
    displayNodes: number;
    method: ContextNetworkMethod;
}
