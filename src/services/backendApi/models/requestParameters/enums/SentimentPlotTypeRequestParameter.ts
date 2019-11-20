import SentimentType from "../../../../../pages/wordAnalysis/models/enums/SentimentType";

enum SentimentPlotTypeRequestParameter {
    V = "V",
    A = "A",
    C = "C"
}

export const mapSentimentTypeEnumToRequestParamEnum = (
    sentimentType: SentimentType
): SentimentPlotTypeRequestParameter => {
    if (sentimentType === SentimentType.VALENCE) return SentimentPlotTypeRequestParameter.V;
    if (sentimentType === SentimentType.AROUSAL) return SentimentPlotTypeRequestParameter.A;
    if (sentimentType === SentimentType.CONCRETENESS) return SentimentPlotTypeRequestParameter.C;

    throw new Error(`${typeof sentimentType} has not been mapped`);
};

export default SentimentPlotTypeRequestParameter;
