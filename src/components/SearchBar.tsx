import React, { useState } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import UpdatableTimeout from "../utils/UpdatableTimeout";
import constructProhibitedCharacterErrorMsg from "../utils/constructProhibitedCharacterErrorMsg";

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
}

export default function SearchBar(props: IProps) {
    const classes = useStyles();
    const {
        onSearch,
        defaultSearchTerm = "",
        placeholder = "",
        autoFocus = false,
        allowedCharacters
    } = props;
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

    const [errorMessage, setErrorMessage] = useState("");

    const search = () => {
        onSearch(searchTerm);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        let prohibitedCharacters: string = "";
        if (typeof allowedCharacters !== "undefined") {
            for (let index = 0; index < value.length; index++) {
                const char = value[index];

                if (allowedCharacters.includes(char)) continue;
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
        if (key === "Enter") {
            search();
        } else if (typeof allowedCharacters !== "undefined" && !allowedCharacters.includes(key)) {
            setErrorMessage(constructProhibitedCharacterErrorMsg(key));
            clearErrorMessageTimeout.updateTimeout(() => {
                setErrorMessage("");
            }, 3000);

            event.preventDefault();
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
