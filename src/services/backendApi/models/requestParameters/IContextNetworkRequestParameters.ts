import ContextNetworkMethod from "./ContextNetworkMethod";

export default interface IContextNetworkRequestParameters {
    searchTerm: string;
    year: number;
    maximumNodes: number;
    contextRelevance: number;
    contextCohesiveness: number;
    wordRelevance: number;
    minimumEdges: number;
    displayNodes: number;
    method?: ContextNetworkMethod;
}
