import Endpoints from "./Endpoints";
import { IClosestRequestParameters } from "./models/requestParameters/IClosestRequestParameters";

export class BackendApi {
    private endpoints: Endpoints;

    constructor() {
        this.endpoints = new Endpoints({
            rootUrl: process.env.REACT_APP_BASE_API_URL,
            apiKey: process.env.REACT_APP_API_KEY
        });
    }

    private parseClosesrQueryParameters(params: IClosestRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerms=${params.searchTerms.join("_")}`);
        paramArray.push(`year=${params.year}`);

        if (params.numberOfClosestWords)
            paramArray.push(`numberOfClosestWords=${params.numberOfClosestWords}`);
        if (params.method) paramArray.push(`method=${params.method}`);

        return paramArray.join("&");
    }

    public getHealth(): Promise<string> {
        return this.endpoints.getHealth();
    }

    public getClosest(params: IClosestRequestParameters): Promise<string> {
        const queryParameters = this.parseClosesrQueryParameters(params);
        return this.endpoints.getClosest(queryParameters);
    }
}
