import axios from "axios";
import IClosestRequestParameters from "./models/requestParameters/IClosestRequestParameters";
import IClosestDataResponse from "./models/responses/IClosestDataResponse";
import ISynonymNetworkRequestParameters from "./models/requestParameters/ISynonymNetworkRequestParameters";
import ISynonymNetworkResponse from "./models/responses/ISynonymNetworkResponse";
import IContextNetworkRequestParameters from "./models/requestParameters/IContextNetworkRequestParameters";
import IContextNetworkResponse from "./models/responses/IContextNetworkResponse";
import ISemanticDriftRequestParameters from "./models/requestParameters/ISemanticDriftRequestParameters";
import ISemanticDriftResponse from "./models/responses/ISemanticDriftResponse";
import IContextChangeRequestParameters from "./models/requestParameters/IContextChangeRequestParameters";
import IContextChangeResponse from "./models/responses/IContextChangeResponse";
import ISentimentRequestParameters from "./models/requestParameters/ISentimentRequestParameters";
import ISentimentResponse from "./models/responses/ISentimentResponse";
import IFrequencyRequestParameters from "./models/requestParameters/IFrequencyRequestParameters";
import IFrequencyResponse from "./models/responses/IFrequencyResponse";
import QueryParameter from "./models/QueryParameter";

axios.defaults.transformResponse = (data: any) => {
    return data;
};

interface IConfig {
    timeout?: number;
    headers?: any;
}

interface IEnpointsProps {
    rootUrl?: string;
    apiVersion?: string;
    apiKey?: string;
}

class Endpoints {
    private readonly config: IConfig;

    constructor(props: IEnpointsProps) {
        const { rootUrl = "http://localhost:3000", apiVersion = "v1", apiKey = "" } = props;

        this.config = {
            timeout: 99999,
            headers: { Authorization: `API_KEY ${apiKey}` }
        };

        axios.defaults.baseURL = `${rootUrl}/${apiVersion}`;
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }

    public async getHealth(): Promise<string> {
        let url = `/health`;

        const response = await axios.get(url, this.config);

        return response.data;
    }

    public async getClosest(params: IClosestRequestParameters): Promise<IClosestDataResponse> {
        let url = "/closest";

        const queryParams = [
            new QueryParameter("searchTerms", params.searchTerm),
            new QueryParameter("year", params.year),
            new QueryParameter("numberOfClosestWords", params.numberOfClosestWords),
            new QueryParameter("method", params.method)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as IClosestDataResponse;
    }

    public async getSynonymNetwork(
        params: ISynonymNetworkRequestParameters
    ): Promise<ISynonymNetworkResponse> {
        let url = "/synonymNetwork";

        const queryParams = [
            new QueryParameter("searchTerm", params.searchTerm),
            new QueryParameter("year", params.year),
            new QueryParameter("synonymsPerTarget", params.synonymsPerTarget),
            new QueryParameter("similarityThreshold", params.similarityThreshold)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as ISynonymNetworkResponse;
    }

    public async getContextNetwork(
        params: IContextNetworkRequestParameters
    ): Promise<IContextNetworkResponse> {
        let url = "/contextNetwork";

        const queryParams = [
            new QueryParameter("searchTerm", params.searchTerm),
            new QueryParameter("year", params.year),
            new QueryParameter("maximumNodes", params.maximumNodes),
            new QueryParameter("contextRelevance", params.contextRelevance),
            new QueryParameter("contextCohesiveness", params.contextCohesiveness),
            new QueryParameter("wordRelevance", params.wordRelevance),
            new QueryParameter("minimumEdges", params.minimumEdges),
            new QueryParameter("displayNodes", params.displayNodes)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as IContextNetworkResponse;
    }

    public async getSemanticDrift(
        params: ISemanticDriftRequestParameters
    ): Promise<ISemanticDriftResponse> {
        let url = "/drift";

        const queryParams = [
            new QueryParameter("searchTerm", params.searchTerm),
            new QueryParameter("startYear", params.startYear),
            new QueryParameter("endYear", params.endYear),
            new QueryParameter("numberOfYearsInInterval", params.numberOfYearsInInterval),
            new QueryParameter("numberOfClosestWords", params.numberOfClosestWords)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as ISemanticDriftResponse;
    }

    public async getContextChange(
        params: IContextChangeRequestParameters,
        decrease: boolean
    ): Promise<IContextChangeResponse> {
        let url = "/contextChange";

        const queryParams = [
            new QueryParameter("searchTerms", params.searchTerm),
            new QueryParameter("startYear", params.startYear),
            new QueryParameter("endYear", params.endYear),
            new QueryParameter("numberOfContextWords", params.numberOfContextWords),
            new QueryParameter("decrease", decrease)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as IContextChangeResponse;
    }

    public async getSentiment(params: ISentimentRequestParameters): Promise<ISentimentResponse> {
        let url = "/sentiment";

        const queryParams = [
            new QueryParameter("searchTerms", params.searchTerm),
            new QueryParameter("plotType", params.plotType)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as ISentimentResponse;
    }

    public async getFrequency(params: IFrequencyRequestParameters): Promise<IFrequencyResponse> {
        let url = "/frequency";

        const queryParams = [
            new QueryParameter("searchTerms", params.searchTerm),
            new QueryParameter("matchFullWord", params.matchFullWord),
            new QueryParameter("matchStart", params.matchStart),
            new QueryParameter("matchMiddle", params.matchMiddle),
            new QueryParameter("matchEnd", params.matchEnd)
        ];

        const response = await this.makeRequest(url, queryParams);

        return JSON.parse(response) as IFrequencyResponse;
    }

    private async makeRequest(url: string, queryParameters?: QueryParameter[]) {
        const queryParameterString: string = this.constructCliParamString(queryParameters);

        const response = await axios.get(`${url}${queryParameterString}`, this.config);

        return response.data as string;
    }

    private constructCliParamString = (params?: QueryParameter[]) => {
        if (!params) return "";

        return (
            "?" +
            params
                .map(param => {
                    return param.buildParamString();
                })
                .join("&")
                .trim()
        );
    };
}

export default Endpoints;
