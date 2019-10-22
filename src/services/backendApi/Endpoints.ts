import axios from "axios";
import IClosestRequestParameters from "./models/requestParameters/IClosestRequestParameters";
import IClosestDataResponse from "./models/responses/IClosestDataResponse";
import ISynonymNetworkRequestParameters from "./models/requestParameters/ISynonymNetworkRequestParameters";
import ISynonymNetworkResponse from "./models/responses/ISynonymNetworkResponse";

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

    private async makeRequest(url: string) {
        this.config.headers = { Authorization: this.authorization };

        const response = await axios.get(url, this.config);

        return response.data as string;
    }

    private parseClosestQueryParameters(params: IClosestRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerms=${params.searchTerm}`);
        paramArray.push(`year=${params.year}`);

        if (params.numberOfClosestWords)
            paramArray.push(`numberOfClosestWords=${params.numberOfClosestWords}`);
        if (params.method) paramArray.push(`method=${params.method}`);

        return paramArray.join("&");
    }

    private parseSynonymNetworkQueryParameters(params: ISynonymNetworkRequestParameters) {
        let paramArray = [];

        paramArray.push(`searchTerm=${params.searchTerm}`);
        paramArray.push(`year=${params.year}`);

        if (params.synonymsPerTarget)
            paramArray.push(`synonymsPerTarget=${params.synonymsPerTarget}`);
        if (params.similarityThreshold)
            paramArray.push(`similarityThreshold=${params.similarityThreshold}`);

        return paramArray.join("&");
    }
}

export default Endpoints;
