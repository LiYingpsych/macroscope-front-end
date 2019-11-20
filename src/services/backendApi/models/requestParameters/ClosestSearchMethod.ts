import SynonymListMethod from "../../../../pages/wordAnalysis/models/SynonymListMethod";

enum ClosestSearchMethod {
    SVD = "SVD",
    SGNS = "SGNS"
}

export const mapSynonymListMethodToClosestSearchMethod = (
    method: SynonymListMethod
): ClosestSearchMethod => {
    if (method === SynonymListMethod.SVD) return ClosestSearchMethod.SVD;
    if (method === SynonymListMethod.SGNS) return ClosestSearchMethod.SGNS;

    throw new Error(`${typeof method} has not been mapped`);
};

export default ClosestSearchMethod;
