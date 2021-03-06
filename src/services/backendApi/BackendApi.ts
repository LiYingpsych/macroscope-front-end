import Endpoints from "./Endpoints";

import IClosestRequestParameters from "./models/requestParameters/IClosestRequestParameters";
import IClosestData from "models/IClosestData";

import ISynonymNetworkRequestParameters from "./models/requestParameters/ISynonymNetworkRequestParameters";
import ISynonymNetworkData from "models/ISynonymNetworkData";

import IContextNetworkRequestParameters from "./models/requestParameters/IContextNetworkRequestParameters";
import IContextNetworkData from "models/IContextNetworkData";

import ISemanticDriftRequestParameters from "./models/requestParameters/ISemanticDriftRequestParameters";
import ISemanticDriftData from "models/ISemanticDriftData";

import IContextChangeRequestParameters from "./models/requestParameters/IContextChangeRequestParameters";
import IContextChangeData from "models/IContextChangeData";

import ISentimentRequestParameters from "./models/requestParameters/ISentimentRequestParameters";
import ISentimentData from "models/ISentimentData";

import IFrequencyRequestParameters from "./models/requestParameters/IFrequencyRequestParameters";
import IFrequencyData from "models/IFrequencyData";

export default class BackendApi {
    private endpoints: Endpoints;

    constructor() {
        this.endpoints = new Endpoints({
            rootUrl: process.env.REACT_APP_BASE_API_URL,
            apiKey: process.env.REACT_APP_API_KEY
        });
    }

    public getHealth(): Promise<string> {
        return this.endpoints.getHealth();
    }

    public async getClosest(params: IClosestRequestParameters): Promise<IClosestData> {
        const json = await this.endpoints.getClosest(params);

        return json.items[0]; // TODO: remove [0] when api no longer accepts multiple words - https://github.com/StraightOuttaCrompton/macroscope-api/issues/5
    }

    public async getSynonymNetwork(
        params: ISynonymNetworkRequestParameters
    ): Promise<ISynonymNetworkData> {
        const json = await this.endpoints.getSynonymNetwork(params);

        return json;
    }

    public async getContextNetwork(
        params: IContextNetworkRequestParameters
    ): Promise<IContextNetworkData> {
        const json = await this.endpoints.getContextNetwork(params);

        return json;
    }

    public async getSemanticDrift(
        params: ISemanticDriftRequestParameters
    ): Promise<ISemanticDriftData> {
        const json = await this.endpoints.getSemanticDrift(params);

        return json;
    }

    public async getContextChange(
        params: IContextChangeRequestParameters
    ): Promise<IContextChangeData> {
        let [increaseResponse, decreaseResponse] = await Promise.all([
            this.endpoints.getContextChange(params, false),
            this.endpoints.getContextChange(params, true)
        ]);

        const result: IContextChangeData = {
            primaryWord: increaseResponse.items[0].primaryWord,
            increasingWords: increaseResponse.items[0].contextChangeWords,
            decreasingWords: decreaseResponse.items[0].contextChangeWords
        };

        return result; // TODO: remove [0] when api no longer accepts multiple words - https://github.com/StraightOuttaCrompton/macroscope-api/issues/5
    }

    public async getSentiment(params: ISentimentRequestParameters): Promise<ISentimentData> {
        const json = await this.endpoints.getSentiment(params);

        return json.items[0];
    }

    public async getFrequency(params: IFrequencyRequestParameters): Promise<IFrequencyData> {
        const json = await this.endpoints.getFrequency(params);

        return json.items[0];
    }
}
