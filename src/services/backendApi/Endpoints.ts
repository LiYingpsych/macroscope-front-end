import axios from "axios";
import IClosestRequestParameters from "./models/requestParameters/IClosestRequestParameters";
import IClosestDataResponse from "./models/responses/IClosestDataResponse";
import ISynonymNetworkRequestParameters from "./models/requestParameters/ISynonymNetworkRequestParameters";
import ISynonymNetworkResponse from "./models/responses/ISynonymNetworkResponse";
import IContextNetworkRequestParameters from "./models/requestParameters/IContextNetworkRequestParameters";
import IContextNetworkResponse from "./models/responses/IContextNetworkResponse";
import ISemanticDriftRequestParameters from "./models/requestParameters/ISemanticDriftRequestParameters";
import ISemanticDriftResponse from "./models/responses/ISemanticDriftResponse";

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
    private readonly authorization: string;

    private readonly config: IConfig = {
        timeout: 99999
    };

    constructor(props: IEnpointsProps) {
        const { rootUrl = "http://localhost:3000", apiVersion = "v1", apiKey = "" } = props;

        this.authorization = `API_KEY ${apiKey}`;

        axios.defaults.baseURL = `${rootUrl}/${apiVersion}`;
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }

    public async getHealth(): Promise<string> {
        let url = `/health`;

        const response = await axios.get(url, this.config);

        return response.data;
    }

    public async getClosest(params: IClosestRequestParameters): Promise<IClosestDataResponse> {
        let url = `/closest?${this.parseClosestQueryParameters(params)}`;

        const response = await this.makeRequest(url);

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
        let url = `/contextNetwork?${this.parseSemanticDriftQueryParameters(params)}`;

        const response = await this.makeRequest(url);

        return JSON.parse(response) as ISemanticDriftResponse;
    }

    private async makeRequest(url: string) {
        this.config.headers = { Authorization: this.authorization };

        const response = await axios.get(url, this.config);

        return response.data as string;
    }

    private parseClosestQueryParameters(params: IClosestRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerms=${params.searchTerm}`);
        paramArray.push(`year=${params.year}`);
        paramArray.push(`numberOfClosestWords=${params.numberOfClosestWords}`);

        if (params.method) paramArray.push(`method=${params.method}`);

        return paramArray.join("&");
    }

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
}

export default Endpoints;
