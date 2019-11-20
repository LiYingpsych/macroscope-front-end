import IDefaultRequestParameters from "./IDefaultRequestParameters";
import ContextNetworkMethodRequestParameter from "./enums/ContextNetworkMethodRequestParameter";

export default interface IContextNetworkRequestParameters extends IDefaultRequestParameters {
    year: number;
    maximumNodes: number;
    contextRelevance: number;
    contextCohesiveness: number;
    wordRelevance: number;
    minimumEdges: number;
    displayNodes: number;
    method?: ContextNetworkMethodRequestParameter;
}
