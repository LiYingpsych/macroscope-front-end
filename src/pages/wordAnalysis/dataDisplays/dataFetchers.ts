import BackendApi from "../../../services/backendApi/BackendApi";
import IClosestRequestParameters from "../../../services/backendApi/models/requestParameters/IClosestRequestParameters";
import ISynonymNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/ISynonymNetworkRequestParameters";

const backendApi = new BackendApi();

export const fetchSynonymListData = async (params: IClosestRequestParameters) => {
    return await backendApi.getClosest(params);
};

export const fetchSynonymNetworkData = async (params: ISynonymNetworkRequestParameters) => {
    return await backendApi.getSynonymNetwork(params);
};
