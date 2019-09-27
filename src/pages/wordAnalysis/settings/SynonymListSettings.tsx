import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
);

export default function SynonymListSettings() {
    const classes = useStyles();

    const [settings, setSettings] = React.useState({
        year: 1990
    });

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSettings(oldValues => ({
            ...oldValues,
            [event.target.name as string]: event.target.value
        }));
    };

    return (
        <form className={classes.root} autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="year-select">
                            Year
                        </InputLabel>
                        <Select
                            value={settings.year}
                            onChange={handleSelectChange}
                            labelWidth={labelWidth}
                            inputProps={{
                                name: "year",
                                id: "year-select"
                            }}
                        >
                            <MenuItem value={1980}>1980</MenuItem>
                            <MenuItem value={1990}>1990</MenuItem>
                            <MenuItem value={2000}>2000</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
}
