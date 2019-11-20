import ContextNetworkMethod from "../../../../../pages/wordAnalysis/models/enums/ContextNetworkMethod";

enum ContextNetworkMethodRequestParameter {
    PMI = "PMI",
    COR = "COR"
}

export const mapContextNetworkEnumToRequestParamEnum = (
    method: ContextNetworkMethod
): ContextNetworkMethodRequestParameter => {
    if (method === ContextNetworkMethod.PMI) return ContextNetworkMethodRequestParameter.PMI;
    if (method === ContextNetworkMethod.COR) return ContextNetworkMethodRequestParameter.COR;

    throw new Error(`${typeof method} has not been mapped`);
};

export default ContextNetworkMethodRequestParameter;
