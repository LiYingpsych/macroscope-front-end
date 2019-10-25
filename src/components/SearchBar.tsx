import React, { useState } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import UpdatableTimeout from "../utils/UpdatableTimeout";
import constructProhibitedCharacterErrorMsg from "../utils/constructProhibitedCharacterErrorMsg";
import { removeDuplicateCharacters } from "../utils/removeDuplicateCharacters";

const clearErrorMessageTimeout = new UpdatableTimeout();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center"
        },
        iconButton: {
            padding: 10
        },
        textField: {
            flex: 1
        }
    })
);

interface IProps {
    onSearch: (searchTerm: string) => void;
    defaultSearchTerm?: string;
    placeholder?: string;
    autoFocus?: boolean;
    allowedCharacters?: string;
    caseSensitive?: boolean;
    allowEmptySearch?: boolean;
}

export default function SearchBar(props: IProps) {
    const classes = useStyles();
    const {
        onSearch,
        defaultSearchTerm = "",
        placeholder = "",
        autoFocus = false,
        allowedCharacters = "",
        caseSensitive = false,
        allowEmptySearch = false
    } = props;
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

    const [errorMessage, setErrorMessage] = useState("");

    const search = () => {
        if (searchTerm.length > 0 || allowEmptySearch) {
            onSearch(searchTerm);
        } else {
            setErrorMessage("Please enter a value");
            clearErrorMessageTimeout.updateTimeout(() => {
                setErrorMessage("");
            }, 10000);
        }
    };

    const parsedAllowedCharacters = removeDuplicateCharacters(
        caseSensitive
            ? allowedCharacters
            : `${allowedCharacters.toLowerCase()}${allowedCharacters.toUpperCase()}`
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        let prohibitedCharacters: string = "";
        if (parsedAllowedCharacters.length > 0) {
            for (let index = 0; index < value.length; index++) {
                const char = value[index];

                if (parsedAllowedCharacters.includes(char)) continue;
                if (prohibitedCharacters.includes(char)) continue;

                prohibitedCharacters += char;
            }
        }

        if (prohibitedCharacters.length > 0) {
            setErrorMessage(constructProhibitedCharacterErrorMsg(prohibitedCharacters));
            clearErrorMessageTimeout.updateTimeout(() => {
                setErrorMessage("");
            }, 10000);
        } else {
            setErrorMessage("");
            setSearchTerm(value);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;

        if (key.toLowerCase() === "enter") {
            search();
        }
    };

    return (
        <Paper className={classes.root}>
            <TextField
                error={errorMessage.length > 0}
                label={errorMessage}
                autoFocus={autoFocus}
                placeholder={placeholder}
                className={classes.textField}
                value={searchTerm}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton className={classes.iconButton} onClick={search}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </Paper>
    );
}
