import React from "react";
import SearchBar from "../components/SearchBar";
import SearchSettings from "./SearchSettings";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function WordAnalysis() {
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
