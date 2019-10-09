import React from "react";
import useReactRouter from "use-react-router";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchSettings, { ISearchSettings } from "./SearchSettings";
import SearchBar from "../../components/SearchBar";
import { closestMaxYear, synonymNetworkMaxYear } from "../../globals";
import { getObjectFromQueryString } from "./getObjectFromQueryString";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function WordAnalysisPage() {
    const classes = useStyles();
    const { location } = useReactRouter();

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
        }
    };

    const currentSettings = getObjectFromQueryString(location.search, defaultSettings);

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
                <SearchSettings defaultSettings={currentSettings} />
            </Grid>
        </Grid>
    );
}
