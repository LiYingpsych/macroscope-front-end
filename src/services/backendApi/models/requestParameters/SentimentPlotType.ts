import SentimentType from "../../../../pages/wordAnalysis/models/SentimentType";

enum SentimentPlotType {
    V = "V",
    A = "A",
    C = "C"
}

export const mapSentimentTypeToPlotTypeRequestParams = (
    sentimentType: SentimentType
): SentimentPlotType => {
    if (sentimentType === SentimentType.VALENCE) return SentimentPlotType.V;
    if (sentimentType === SentimentType.AROUSAL) return SentimentPlotType.A;
    if (sentimentType === SentimentType.CONCRETENESS) return SentimentPlotType.C;

    throw new Error(`${typeof sentimentType} has not been mapped`);
};

export default SentimentPlotType;
