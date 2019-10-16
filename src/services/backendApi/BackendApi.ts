import Endpoints from "./Endpoints";
import { IClosestRequestParameters } from "./models/requestParameters/IClosestRequestParameters";
import { IClosestDataResponse } from "./models/responses/IClosestDataResponse";
import { IClosestDataModel } from "../../models/IClosestDataModel";

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

        paramArray.push(`searchTerms=${params.searchTerm}`);
        paramArray.push(`year=${params.year}`);

        if (params.numberOfClosestWords)
            paramArray.push(`numberOfClosestWords=${params.numberOfClosestWords}`);
        if (params.method) paramArray.push(`method=${params.method}`);

        return paramArray.join("&");
    }

    public getHealth(): Promise<string> {
        return this.endpoints.getHealth();
    }

    public async getClosest(params: IClosestRequestParameters): Promise<IClosestDataModel> {
        const queryParameters = this.parseClosesrQueryParameters(params);

        const json = await this.endpoints.getClosest(queryParameters);

        const parsedJson: IClosestDataResponse = JSON.parse(json);

        return parsedJson.items.map(item => {
            const closestData: IClosestDataModel = {
                primaryWord: {
                    index: item.primaryWord.index,
                    value: item.primaryWord.value
                },
                closestWords: item.closestWords.map(closestWord => {
                    return {
                        word: {
                            index: closestWord.word.index,
                            value: closestWord.word.value
                        },
                        score: closestWord.score
                    };
                })
            };

            return closestData;
        })[0]; // TODO: remove [0] when api no longer accepts multiple words - https://github.com/StraightOuttaCrompton/macroscope-api/issues/5
    }
}
