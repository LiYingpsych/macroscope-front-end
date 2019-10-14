import React, { useState } from "react";

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

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function WordAnalysisPage() {
    const classes = useStyles();

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

    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
    const [settings, setSettings] = useState(defaultSettings);

    return (
        <Grid container direction="column" spacing={4}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchbarWithSettings
                    defaultSearchTerm={defaultSearchTerm}
                    defaultSettings={defaultSettings}
                    onSearch={(updatedSearchTerm: string, updatedSettings: ISearchSettings) => {
                        setSearchTerm(updatedSearchTerm);
                        setSettings(updatedSettings);
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <DataDisplays searchTerm={searchTerm} settings={settings}></DataDisplays>
            </Grid>
        </Grid>
    );
}
