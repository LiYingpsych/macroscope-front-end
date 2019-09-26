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
    onSearch: (searchWord: string) => void;
    placeholder?: string;
}

export default function SearchBar(props: IProps) {
    const classes = useStyles();
    const { onSearch, placeholder = "" } = props;
    const [searchWord, setSearchWord] = useState("");

    const search = () => {
        onSearch(searchWord);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            search();
        }
    };

    return (
        <Paper className={classes.root}>
            <TextField
                placeholder={placeholder}
                className={classes.textField}
                value={searchWord}
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
