import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface ISynonymNetworkRequestParameters extends DefaultRequestParameters {
    year: number;
    synonymsPerTarget: number;
    similarityThreshold: number;
}
