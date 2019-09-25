import React, { useState } from "react";
import { TextField, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        dense: {
            marginTop: theme.spacing(2)
        },
        menu: {
            width: 200
        }
    })
);

export const WordAnalysis: React.FC = () => {
    const classes = useStyles();
    const [searchWord, setSearchWord] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event.target.value);
    };

    return (
        <div>
            <TextField
                id="word-analysis-search"
                label="Search word"
                className={classes.textField}
                value={searchWord}
                onChange={handleChange}
                // style={{ margin: 8 }}
                // placeholder="Placeholder"
                helperText={searchWord}
                // fullWidth
                margin="normal"
                variant="outlined"
                // InputLabelProps={{
                //   shrink: true,
                // }}
            />
        </div>
    );
};
