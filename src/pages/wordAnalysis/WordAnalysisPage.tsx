import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DataDisplays from "./dataDisplays";

import {
    closestMaxYear,
    synonymNetworkMaxYear,
    contextNetworkMaxYear,
    contextChangeMinYear,
    contextChangeMaxYear,
    alphabet
} from "../../globals";

import SentimentType from "./models/SentimentType";
import ISearchSettings from "./models/ISearchSettings";
import { getObjectFromQueryString } from "./getObjectFromQueryString";
import { encodeQueryStringObject } from "../../utils/queryStringUtils";

import SearchBar from "../../components/SearchBar";
import ClippedDrawer from "../../components/ClippedDrawer";
import PageContent from "../../components/PageContent";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%",
            flex: "1 0 auto"
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
        <ClippedDrawer anchor="right">
            <PageContent>
                <Grid item container direction="column" spacing={2}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <SearchBar
                            autoFocus={true}
                            defaultSearchTerm={searchTerm}
                            placeholder="Search word..."
                            allowedCharacters={`${alphabet.toLowerCase()}`}
                            onSearch={(updatedSearchTerm: string) => {
                                setSearchTerm(updatedSearchTerm);
                                pushToHistory({
                                    settings: settings,
                                    searchTerm: updatedSearchTerm
                                });
                            }}
                            caseSensitive
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <DataDisplays
                            searchTerm={searchTerm}
                            searchSettings={settings}
                        ></DataDisplays>
                    </Grid>
                    {/* <SearchSettings
                    defaultSettings={settings}
                    onUpdate={(updatedSettings: ISearchSettings) => {
                        console.log("on update");
                        setSettings(updatedSettings);
                        console.log(updatedSettings.synonymListSettingsPanel.isOpen);
                        pushToHistory({
                            settings: updatedSettings,
                            searchTerm: searchTerm
                        });
                    }}
                /> */}
                </Grid>
            </PageContent>
        </ClippedDrawer>
    );
}
