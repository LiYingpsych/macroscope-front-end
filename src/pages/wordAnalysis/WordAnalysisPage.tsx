import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import SearchSettings from "./SearchSettings";
import SearchBar from "../../components/SearchBar";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function WordAnalysisPage() {
    const classes = useStyles();

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
                <SearchSettings />
            </Grid>
        </Grid>
    );
}
