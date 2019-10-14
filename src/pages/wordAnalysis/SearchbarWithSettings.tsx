import React, { useState } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchBar from "../../components/SearchBar";
import SearchSettingsWithUrlParsing from "./searchSettings/SearchSettingsWithUrlParsing";
import ISearchSettings from "./models/ISearchSettings";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

interface IProps {
    defaultSettings: ISearchSettings;
    defaultSearchTerm: string;
    onSearch?: (searchTerm: string, settings: ISearchSettings) => void;
}

export default function SearchbarWithSettings(props: IProps) {
    const classes = useStyles();
    const {
        defaultSettings,
        defaultSearchTerm,
        onSearch = (searchTerm: string, settings: ISearchSettings) => {}
    } = props;

    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
    const [settings, setSettings] = useState(defaultSettings);

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchBar
                    defaultSearchTerm={defaultSearchTerm}
                    placeholder="Search word..."
                    onSearch={(updatedSearchTerm: string) => {
                        setSearchTerm(updatedSearchTerm);
                        onSearch(updatedSearchTerm, settings);
                    }}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchSettingsWithUrlParsing
                    defaultSettings={defaultSettings}
                    onUpdate={(updatedSettings: ISearchSettings) => {
                        setSettings(updatedSettings);
                        onSearch(searchTerm, updatedSettings);
                    }}
                />
            </Grid>
        </Grid>
    );
}
