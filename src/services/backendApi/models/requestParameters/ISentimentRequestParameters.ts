import SentimentPlotType from "./SentimentPlotType";

export default interface ISentimentRequestParameters {
    searchTerm: string;
    plotType?: SentimentPlotType;
}
