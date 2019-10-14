import React, { useState } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

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
}

export default function SearchBar(props: IProps) {
    const classes = useStyles();
    const { onSearch, defaultSearchTerm = "", placeholder = "", autoFocus = false } = props;
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

    const search = () => {
        onSearch(searchTerm);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            search();
        }
    };

    return (
        <Paper className={classes.root}>
            <TextField
                autoFocus={autoFocus}
                placeholder={placeholder}
                className={classes.textField}
                value={searchTerm}
                onChange={handleChange}
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
                onKeyPress={handleKeyPress}
            />
        </Paper>
    );
}
