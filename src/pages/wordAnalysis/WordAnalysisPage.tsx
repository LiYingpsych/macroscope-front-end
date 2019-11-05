import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchbarWithSettings from "./SearchbarWithSettings";
import DataDisplays from "./dataDisplays";

import {
    closestMaxYear,
    synonymNetworkMaxYear,
    contextNetworkMaxYear,
    contextChangeMinYear,
    contextChangeMaxYear
} from "../../globals";

import SentimentType from "./models/SentimentType";
import ISearchSettings from "./models/ISearchSettings";
import { getObjectFromQueryString } from "./getObjectFromQueryString";
import { encodeQueryStringObject } from "../../utils/queryStringUtils";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

const defaultSearchTerm: string = "";
const defaultSettings: ISearchSettings = {
    synonymListSettingsPanel: {
        isOpen: true,
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
            similarityThreshold: 0.7
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
            type: SentimentType.VALENCE
        }
    },
    frequencySettingsPanel: {
        isOpen: false,
        settings: {}
    }
};

interface IQueryStringObject {
    settings: ISearchSettings;
    searchTerm: string;
}

export default function WordAnalysisPage() {
    const classes = useStyles();

    let location = useLocation();

    const pushToHistory = (object: IQueryStringObject) => {
        window.history.pushState({}, "", `?${encodeQueryStringObject(object)}`);
    };

    const defultQueryStringObject: IQueryStringObject = {
        settings: defaultSettings,
        searchTerm: defaultSearchTerm
    };

    const parsedQueryStringObj = getObjectFromQueryString(location.search, defultQueryStringObject);

    const [settings, setSettings] = useState(parsedQueryStringObj.settings);
    const [searchTerm, setSearchTerm] = useState(parsedQueryStringObj.searchTerm);

    if (location.pathname.toLowerCase() === "/wordanalysis")
        pushToHistory({ settings: settings, searchTerm: searchTerm });

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchbarWithSettings
                    autoFocus={true}
                    defaultSearchTerm={searchTerm}
                    defaultSettings={settings}
                    onSearch={(updatedSearchTerm: string, updatedSettings: ISearchSettings) => {
                        setSearchTerm(updatedSearchTerm);
                        setSettings(updatedSettings);
                        // TODO: add search term to url object
                        pushToHistory({ settings: updatedSettings, searchTerm: updatedSearchTerm });
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <DataDisplays searchTerm={searchTerm} searchSettings={settings}></DataDisplays>
            </Grid>
        </Grid>
    );
}
