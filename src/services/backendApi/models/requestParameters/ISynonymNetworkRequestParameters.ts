import IDefaultRequestParameters from "./IDefaultRequestParameters";

export default interface ISynonymNetworkRequestParameters extends IDefaultRequestParameters {
    year: number;
    synonymsPerTarget: number;
    similarityThreshold: number;
}
