import ContextNetworkMethod from "./ContextNetworkMethod";
import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface IContextNetworkRequestParameters extends DefaultRequestParameters {
    year: number;
    maximumNodes: number;
    contextRelevance: number;
    contextCohesiveness: number;
    wordRelevance: number;
    minimumEdges: number;
    displayNodes: number;
    method?: ContextNetworkMethod;
}
