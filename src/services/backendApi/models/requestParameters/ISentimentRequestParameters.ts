import SentimentPlotType from "./SentimentPlotType";
import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface ISentimentRequestParameters extends DefaultRequestParameters {
    plotType?: SentimentPlotType;
}
