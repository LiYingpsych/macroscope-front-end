import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DataDisplays from "./dataDisplays";

import { settingsRanges, alphabet, layout, transparentColour } from "globalConsts";

import SentimentType from "./models/enums/SentimentType";
import SynonymListMethod from "./models/enums/SynonymListMethod";
import ContextNetworkMethod from "./models/enums/ContextNetworkMethod";

import ISearchSettings from "./models/ISearchSettings";
import { getObjectFromQueryString } from "./getObjectFromQueryString";
import { encodeQueryStringObject } from "utils/queryStringUtils";

import SearchBar from "components/SearchBar";
import ClippedDrawer from "components/ClippedDrawer";
import PageContent from "components/layout/PageContent";
import SearchSettings from "./searchSettings/SearchSettings";

const useStyles = makeStyles((theme: Theme) => {
    const { wordAnalysisDrawerWidth, pageContentPadding, searchBarMaxWidth } = layout;

    const floatingBarWidth = `calc(100% - ${wordAnalysisDrawerWidth}px - ${theme.spacing(
        pageContentPadding * 2
    )}px)`;

    return createStyles({
        floatingBarContainer: {
            flex: "1 0 auto",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: theme.spacing(4) + 56,
            paddingBottom: `${theme.spacing(3)} !important`
        },
        floatingBar: {
            maxWidth: searchBarMaxWidth,
            display: "flex",
            alignItems: "center",
            position: "fixed",
            zIndex: theme.zIndex.drawer,
            marginTop: theme.spacing(1),
            width: floatingBarWidth
        },
        blurField: {
            position: "fixed",
            maxWidth: "inherit",
            height: "inherit",
            zIndex: theme.zIndex.drawer - 1,
            opacity: 0.7,
            backgroundImage: `linear-gradient(${theme.palette.grey[100]}, ${theme.palette.grey[100]}, ${transparentColour})`,
            width: floatingBarWidth,
            pointerEvents: "none"
        },
        searchBar: {
            flex: "1 0 auto"
        }
    });
});

const defaultSearchTerm: string = "";
const defaultSettings: ISearchSettings = {
    sentimentSettingsPanel: {
        isOpen: true,
        settings: {
            type: SentimentType.VALENCE
        }
    },
    frequencySettingsPanel: {
        isOpen: true,
        settings: {}
    },
    synonymListSettingsPanel: {
        isOpen: false,
        settings: {
            year: settingsRanges.closest.years.max,
            numberOfSynonyms: 5,
            method: SynonymListMethod.SGNS
        }
    },
    synonymNetworkSettingsPanel: {
        isOpen: false,
        settings: {
            year: settingsRanges.synonymNetwork.years.max,
            synonymsPerTarget: 5,
            similarityThreshold: 0.7
        }
    },
    contextNetworkSettingsPanel: {
        isOpen: false,
        settings: {
            year: settingsRanges.contextNetwork.years.max,
            maximumNodes: 50,
            contextRelevance: 0.55,
            contextCohesiveness: 0.55,
            individualWordRelevance: 3,
            minimumEdges: 5,
            displayNodes: 110,
            method: ContextNetworkMethod.COR
        }
    },
    semanticDriftSettingsPanel: {
        isOpen: false,
        settings: {}
    },
    contextChangeSettingsPanel: {
        isOpen: false,
        settings: {
            startYear: settingsRanges.contextChange.years.min,
            endYear: settingsRanges.contextChange.years.max,
            numberOfContextWords: 20
        }
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
        <ClippedDrawer
            anchor="left"
            width={layout.wordAnalysisDrawerWidth}
            drawerContent={
                <SearchSettings
                    defaultSettings={settings}
                    onChange={(updatedSettings: ISearchSettings) => {
                        setSettings(updatedSettings);
                        pushToHistory({
                            settings: updatedSettings,
                            searchTerm: searchTerm
                        });
                    }}
                />
            }
        >
            <PageContent paddingTop={0} maxWidth="none">
                <div className={classes.floatingBarContainer}>
                    <div className={classes.blurField}></div>
                    <div className={classes.floatingBar}>
                        <SearchBar
                            className={classes.searchBar}
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
                    </div>
                </div>
                <DataDisplays searchTerm={searchTerm} searchSettings={settings} />
            </PageContent>
        </ClippedDrawer>
    );
}
