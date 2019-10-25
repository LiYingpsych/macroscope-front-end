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
        let url = `/closest`;

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
        let url = `/synonymNetwork?${this.parseSynonymNetworkQueryParameters(params)}`;

        const response = await this.makeRequest(url);

        return JSON.parse(response) as ISynonymNetworkResponse;
    }

    public async getContextNetwork(
        params: IContextNetworkRequestParameters
    ): Promise<IContextNetworkResponse> {
        let url = `/contextNetwork?${this.parseContextNetworkQueryParameters(params)}`;

        const response = await this.makeRequest(url);

        return JSON.parse(response) as IContextNetworkResponse;
    }

    public async getSemanticDrift(
        params: ISemanticDriftRequestParameters
    ): Promise<ISemanticDriftResponse> {
        let url = `/drift?${this.parseSemanticDriftQueryParameters(params)}`;

        const response = await this.makeRequest(url);

        return JSON.parse(response) as ISemanticDriftResponse;
    }

    public async getContextChange(
        params: IContextChangeRequestParameters
    ): Promise<IContextChangeResponse> {
        let url = `/contextChange?${this.parseContextChangeQueryParameters(params)}`;

        const response = await this.makeRequest(url);

        return JSON.parse(response) as IContextChangeResponse;
    }

    public async getSentiment(params: ISentimentRequestParameters): Promise<ISentimentResponse> {
        let url = `/emotion?${this.parseSentimentQueryParameters(params)}`;

        const response = await this.makeRequest(url);

        return JSON.parse(response) as ISentimentResponse;
    }

    public async getFrequency(params: IFrequencyRequestParameters): Promise<IFrequencyResponse> {
        let url = `/frequency?${this.parseFrequencyQueryParameters(params)}`;

        const response = await this.makeRequest(url);

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

    private parseSynonymNetworkQueryParameters(params: ISynonymNetworkRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerm=${params.searchTerm}`);
        paramArray.push(`year=${params.year}`);
        paramArray.push(`synonymsPerTarget=${params.synonymsPerTarget}`);
        paramArray.push(`similarityThreshold=${params.similarityThreshold}`);

        return paramArray.join("&");
    }

    private parseContextNetworkQueryParameters(params: IContextNetworkRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerm=${params.searchTerm}`);
        paramArray.push(`year=${params.year}`);
        paramArray.push(`maximumNodes=${params.maximumNodes}`);
        paramArray.push(`contextRelevance=${params.contextRelevance}`);
        paramArray.push(`contextCohesiveness=${params.contextCohesiveness}`);
        paramArray.push(`wordRelevance=${params.wordRelevance}`);
        paramArray.push(`minimumEdges=${params.minimumEdges}`);
        paramArray.push(`displayNodes=${params.displayNodes}`);

        if (params.method) paramArray.push(`method=${params.method}`);

        return paramArray.join("&");
    }

    private parseSemanticDriftQueryParameters(params: ISemanticDriftRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerm=${params.searchTerm}`);
        paramArray.push(`startYear=${params.startYear}`);
        paramArray.push(`endYear=${params.endYear}`);
        paramArray.push(`numberOfYearsInInterval=${params.numberOfYearsInInterval}`);
        paramArray.push(`numberOfClosestWords=${params.numberOfClosestWords}`);

        return paramArray.join("&");
    }

    private parseContextChangeQueryParameters(params: IContextChangeRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerms=${params.searchTerm}`);
        paramArray.push(`startYear=${params.startYear}`);
        paramArray.push(`endYear=${params.endYear}`);
        paramArray.push(`numberOfContextWords=${params.numberOfContextWords}`);
        paramArray.push(`decrease=${params.decrease}`);

        return paramArray.join("&");
    }

    private parseSentimentQueryParameters(params: ISentimentRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerms=${params.searchTerm}`);
        paramArray.push(`plotType=${params.plotType}`);

        return paramArray.join("&");
    }

    private parseFrequencyQueryParameters(params: IFrequencyRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerms=${params.searchTerm}`);
        paramArray.push(`matchFullWord=${params.matchFullWord}`);
        paramArray.push(`matchStart=${params.matchStart}`);
        paramArray.push(`matchMiddle=${params.matchMiddle}`);
        paramArray.push(`matchEnd=${params.matchEnd}`);

        return paramArray.join("&");
    }
}

export default Endpoints;
