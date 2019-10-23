import BackendApi from "../../../services/backendApi/BackendApi";
import IClosestRequestParameters from "../../../services/backendApi/models/requestParameters/IClosestRequestParameters";

const backendApi = new BackendApi();

export const fetchClosestData = async (params: IClosestRequestParameters) => {
    return await backendApi.getClosest(params);
};
