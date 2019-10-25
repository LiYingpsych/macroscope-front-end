import BackendApi from "../../../services/backendApi/BackendApi";
import IClosestRequestParameters from "../../../services/backendApi/models/requestParameters/IClosestRequestParameters";
import ISynonymNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/ISynonymNetworkRequestParameters";
import IContextNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/IContextNetworkRequestParameters";
import ISemanticDriftRequestParameters from "../../../services/backendApi/models/requestParameters/ISemanticDriftRequestParameters";

const backendApi = new BackendApi();

export const fetchSynonymListData = async (params: IClosestRequestParameters) => {
    return await backendApi.getClosest(params);
};

export const fetchSynonymNetworkData = async (params: ISynonymNetworkRequestParameters) => {
    return await backendApi.getSynonymNetwork(params);
};

export const fetchContextNetworkData = async (params: IContextNetworkRequestParameters) => {
    return await backendApi.getContextNetwork(params);
};

export const fetchSemanticDriftData = async (params: ISemanticDriftRequestParameters) => {
    return await backendApi.getSemanticDrift(params);
};
