import BackendApi from "services/backendApi/BackendApi";
import IClosestRequestParameters from "services/backendApi/models/requestParameters/IClosestRequestParameters";
import ISynonymNetworkRequestParameters from "services/backendApi/models/requestParameters/ISynonymNetworkRequestParameters";
import IContextNetworkRequestParameters from "services/backendApi/models/requestParameters/IContextNetworkRequestParameters";
import ISemanticDriftRequestParameters from "services/backendApi/models/requestParameters/ISemanticDriftRequestParameters";
import IContextChangeRequestParameters from "services/backendApi/models/requestParameters/IContextChangeRequestParameters";
import ISentimentRequestParameters from "services/backendApi/models/requestParameters/ISentimentRequestParameters";
import IFrequencyRequestParameters from "services/backendApi/models/requestParameters/IFrequencyRequestParameters";
import makeSingle from "utils/makeSingle";

const backendApi = new BackendApi();

function* fetchSynonymListData(params: IClosestRequestParameters) {
    yield backendApi.getClosest(params);
}

function* fetchSynonymNetworkData(params: ISynonymNetworkRequestParameters) {
    yield backendApi.getSynonymNetwork(params);
}

function* fetchContextNetworkData(params: IContextNetworkRequestParameters) {
    yield backendApi.getContextNetwork(params);
}

function* fetchSemanticDriftData(params: ISemanticDriftRequestParameters) {
    yield backendApi.getSemanticDrift(params);
}

function* fetchContextChangeData(params: IContextChangeRequestParameters) {
    yield backendApi.getContextChange(params);
}

function* fetchSentimentData(params: ISentimentRequestParameters) {
    yield backendApi.getSentiment(params);
}

function* fetchFrequencyData(params: IFrequencyRequestParameters) {
    yield backendApi.getFrequency(params);
}

export default {
    fetchSynonymListData: makeSingle(fetchSynonymListData),
    fetchSynonymNetworkData: makeSingle(fetchSynonymNetworkData),
    fetchContextNetworkData: makeSingle(fetchContextNetworkData),
    fetchSemanticDriftData: makeSingle(fetchSemanticDriftData),
    fetchContextChangeData: makeSingle(fetchContextChangeData),
    fetchSentimentData: makeSingle(fetchSentimentData),
    fetchFrequencyData: makeSingle(fetchFrequencyData)
};
