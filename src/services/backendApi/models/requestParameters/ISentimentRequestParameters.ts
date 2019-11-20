import IDefaultRequestParameters from "./IDefaultRequestParameters";
import SentimentPlotTypeRequestParameter from "./enums/SentimentPlotTypeRequestParameter";

export default interface ISentimentRequestParameters extends IDefaultRequestParameters {
    plotType?: SentimentPlotTypeRequestParameter;
}
