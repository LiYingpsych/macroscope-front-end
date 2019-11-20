import SynonymListMethod from "../../../../../pages/wordAnalysis/models/enums/SynonymListMethod";

enum ClosestSearchMethodRequestParameter {
    SVD = "SVD",
    SGNS = "SGNS"
}

export const mapSynonymListEnumToRequestParamEnum = (
    method: SynonymListMethod
): ClosestSearchMethodRequestParameter => {
    if (method === SynonymListMethod.SVD) return ClosestSearchMethodRequestParameter.SVD;
    if (method === SynonymListMethod.SGNS) return ClosestSearchMethodRequestParameter.SGNS;

    throw new Error(`${typeof method} has not been mapped`);
};

export default ClosestSearchMethodRequestParameter;
