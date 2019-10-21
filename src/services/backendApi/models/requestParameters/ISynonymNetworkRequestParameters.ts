export default interface ISynonymNetworkRequestParameters {
    searchTerm: string;
    year: number;
    synonymsPerTarget?: number;
    similarityThreshold?: number;
}
