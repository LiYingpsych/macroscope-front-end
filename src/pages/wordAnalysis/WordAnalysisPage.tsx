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

import SentimentTypes from "./models/SentimentTypes";
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
            type: SentimentTypes.VALENCE
        }
    },
    frequencySettingsPanel: {
        isOpen: false,
        settings: {}
    }
};

export default function WordAnalysisPage() {
    const classes = useStyles();

    let location = useLocation();

    const pushSettingsToHistory = (settings: ISearchSettings) => {
        window.history.pushState({}, "", `?${encodeQueryStringObject(settings)}`);
    };

    const parsedSettings = getObjectFromQueryString(location.search, defaultSettings);
    const [settings, setSettings] = useState(parsedSettings);
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

    if (location.pathname.toLowerCase() === "/wordanalysis") pushSettingsToHistory(settings);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchbarWithSettings
                    autoFocus={true}
                    defaultSearchTerm={defaultSearchTerm}
                    defaultSettings={settings}
                    onSearch={(updatedSearchTerm: string, updatedSettings: ISearchSettings) => {
                        setSearchTerm(updatedSearchTerm);
                        setSettings(updatedSettings);
                        // TODO: add search term to url object
                        pushSettingsToHistory(updatedSettings);
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <DataDisplays searchTerm={searchTerm} searchSettings={settings}></DataDisplays>
            </Grid>
        </Grid>
    );
}
