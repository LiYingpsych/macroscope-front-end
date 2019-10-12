import React, { useState } from "react";

import { BackendApi } from "../../services/backendApi/BackendApi";
import { ClosestSearchMethod } from "../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import SearchbarWithSettings from "./SearchbarWithSettings";
import { Button } from "@material-ui/core";
import ISearchSettings from "./searchSettings/models/ISearchSettings";

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
    const [blah, setBlah] = useState(0);
    return (
        <>
            <SearchbarWithSettings
                onSearch={(searchWord: string, settings: ISearchSettings) => {
                    console.log(`searchWord: ${searchWord}`);
                    console.log(settings);
                }}
            />
            <Button
                onClick={() => {
                    console.log(blah);
                    setBlah(blah + 1);
                }}
            >
                Helo
            </Button>
        </>
    );
}
