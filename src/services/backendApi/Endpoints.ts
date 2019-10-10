import axios from "axios";

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
    private readonly apiVersion: string;
    private readonly authorization: string;

    private readonly config: IConfig = {
        timeout: 99999
    };

    // TODO: extract into object
    constructor(props: IEnpointsProps) {
        const { rootUrl = "http://localhost:3000", apiVersion = "v1", apiKey = "" } = props;

        this.apiVersion = apiVersion;
        this.authorization = `API_KEY ${apiKey}`;

        axios.defaults.baseURL = rootUrl;
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }

    public async getHealth(): Promise<string> {
        let url = `/health`;

        const response = await axios.get(url, this.config);

        return response.data;
    }

    public async getClosest(queryParameters: string): Promise<string> {
        let url = `/${this.apiVersion}/closest?${queryParameters}`;

        this.config.headers = { Authorization: this.authorization };

        const response = await axios.get(url, this.config);

        return response.data;
    }
}

export default Endpoints;
