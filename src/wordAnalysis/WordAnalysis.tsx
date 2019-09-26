import React from "react";
import SearchBar from "../components/SearchBar";
import SearchSettings from "./SearchSettings";
import Grid from "@material-ui/core/Grid";

export default function WordAnalysis() {
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
                <SearchBar
                    placeholder="Search word..."
                    onSearch={(searchWord: string) => {
                        console.log(`Search word: ${searchWord}`);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <SearchSettings />
            </Grid>
        </Grid>
    );
}
