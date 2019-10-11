import React from "react";

import { BackendApi } from "../../services/backendApi/BackendApi";
import { ClosestSearchMethod } from "../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import SearchbarWithSettings from "./SearchbarWithSettings";
import { ISearchSettings } from "./SearchSettings";

const backendApi = new BackendApi();
const getData = () => {
    return backendApi
        .getClosest({
            searchTerms: ["hello", "there"],
            year: 1990,
            numberOfClosestWords: 5,
            method: ClosestSearchMethod.SGNS
        })
        .then(data => {
            console.log(data);
        });
};

export default function WordAnalysisPage() {
    return (
        <SearchbarWithSettings
            onSearch={(searchWord: string, settings: ISearchSettings) => {
                console.log(`searchWord: ${searchWord}`);
                console.log(settings);
            }}
        />
    );
}
