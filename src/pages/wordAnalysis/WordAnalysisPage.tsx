import React from "react";
import useReactRouter from "use-react-router";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchSettings, { ISearchSettings } from "./SearchSettings";
import SearchBar from "../../components/SearchBar";
import {
    closestMaxYear,
    synonymNetworkMaxYear,
    contextNetworkMaxYear,
    contextChangeMinYear,
    contextChangeMaxYear
} from "../../globals";
import { getObjectFromQueryString } from "./getObjectFromQueryString";
import { encodeQueryStringObject } from "../../utils/queryStringUtils";
import { SentimentTypes } from "./settings/SentimentSettings";

import { BackendApi } from "../../services/backendApi/BackendApi";
import { ClosestSearchMethod } from "../../services/backendApi/models/requestParameters/ClosestSearchMethod";

const backendApi = new BackendApi();
backendApi
    .getClosest({
        searchTerms: ["hello", "there"],
        year: 1990,
        numberOfClosestWords: 5,
        method: ClosestSearchMethod.SGNS
    })
    .then(data => {
        console.log(data);
    });

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function WordAnalysisPage() {
    const classes = useStyles();
    const { location, history } = useReactRouter();

    const defaultSettings: ISearchSettings = {
        synonymListSettingsPanel: {
            isOpen: false,
            settings: {
                year: closestMaxYear,
                numberOfSynonyms: 5
            }
        },
        synonymNetworkSettingsPanel: {
            isOpen: false,
            settings: {
                year: synonymNetworkMaxYear,
                synonymsPerTarget: 5,
                simalarityThreshold: 0.7
            }
        },
        contextNetworkSettingsPanel: {
            isOpen: false,
            settings: {
                year: contextNetworkMaxYear,
                maximumNodes: 200,
                contextRelevance: 0.55,
                contextCohesiveness: 0.55,
                individualWordRelevance: 3,
                minimumEdges: 5,
                displayNodes: 110
            }
        },
        semanticDriftSettingsPanel: {
            isOpen: false,
            settings: {}
        },
        contextChangeSettingsPanel: {
            isOpen: false,
            settings: {
                startYear: contextChangeMinYear,
                endYear: contextChangeMaxYear
            }
        },
        sentimentSettingsPanel: {
            isOpen: false,
            settings: {
                type: SentimentTypes.VALENCE
            }
        },
        frequencySettingsPanel: {
            isOpen: false,
            settings: {}
        }
    };

    const updateSettings = (settings: ISearchSettings) => {
        history.push(`?${encodeQueryStringObject(settings)}`);
    };

    let currentSettings = JSON.parse(JSON.stringify(defaultSettings));
    try {
        currentSettings = getObjectFromQueryString(location.search, defaultSettings);
    } catch (error) {
        updateSettings(defaultSettings);
    }

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchBar
                    placeholder="Search word..."
                    onSearch={(searchWord: string) => {
                        console.log(`Search word: ${searchWord}`);
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchSettings
                    defaultSettings={currentSettings}
                    onUpdate={(updatedSettings: ISearchSettings) => {
                        updateSettings(updatedSettings);
                    }}
                />
            </Grid>
        </Grid>
    );
}
