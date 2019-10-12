import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchBar from "../../components/SearchBar";
import {
    closestMaxYear,
    synonymNetworkMaxYear,
    contextNetworkMaxYear,
    contextChangeMinYear,
    contextChangeMaxYear
} from "../../globals";
import { SentimentTypes } from "./searchSettings/settings/SentimentSettings";
import SearchSettingsWithUrlParsing from "./searchSettings/SearchSettingsWithUrlParsing";
import ISearchSettings from "./searchSettings/models/ISearchSettings";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

interface IProps {
    onSearch?: (searchWord: string, settings: ISearchSettings) => void;
}

export default function SearchbarWithSettings(props: IProps) {
    const classes = useStyles();
    // const { onSearch = (searchWord: string, settings: ISearchSettings) => {} } = props;

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

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchBar
                    placeholder="Search word..."
                    onSearch={(searchWord: string) => {
                        console.log(searchWord);
                        // onSearch(searchWord, currentSettings);
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchSettingsWithUrlParsing
                    defaultSettings={defaultSettings}
                    onUpdate={(updatedSettings: ISearchSettings) => {
                        console.log(updatedSettings);
                    }}
                />
            </Grid>
        </Grid>
    );
}
