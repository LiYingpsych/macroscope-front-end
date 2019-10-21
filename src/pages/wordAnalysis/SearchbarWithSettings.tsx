import React, { useState } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SearchBar from "../../components/SearchBar";
import SearchSettings from "./searchSettings/SearchSettings";
import ISearchSettings from "./models/ISearchSettings";
import { alphabet } from "../../globals";

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
    autoFocus?: boolean;
}

export default function SearchbarWithSettings(props: IProps) {
    const classes = useStyles();
    const {
        defaultSettings,
        defaultSearchTerm,
        onSearch = (searchTerm: string, settings: ISearchSettings) => {},
        autoFocus = false
    } = props;

    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
    const [settings, setSettings] = useState(defaultSettings);

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchBar
                    autoFocus={autoFocus}
                    defaultSearchTerm={defaultSearchTerm}
                    placeholder="Search word..."
                    allowedCharacters={`${alphabet.toLowerCase()}`}
                    onSearch={(updatedSearchTerm: string) => {
                        setSearchTerm(updatedSearchTerm);
                        onSearch(updatedSearchTerm, settings);
                    }}
                    onChange={(updatedSearchTerm: string) => {
                        setSearchTerm(updatedSearchTerm);
                    }}
                    caseSensitive
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <SearchSettings
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
