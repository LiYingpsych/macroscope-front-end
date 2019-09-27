import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { closestMaxYear, closestMinYear } from "../../../globals";

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

function range(intervalStart: number, intervalEnd: number, step: number) {
    let i: number = intervalStart;
    let rangeArray: number[] = [];

    while (i <= intervalEnd) {
        rangeArray.push(i);
        i += step;
    }

    return rangeArray;
}

export default function SynonymListSettings() {
    const classes = useStyles();

    const years: number[] = range(closestMinYear, closestMaxYear, 10);

    const [settings, setSettings] = React.useState({
        year: years[years.length - 1]
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
                            {years.map((year: number) => {
                                return (
                                    <MenuItem value={year} key={`menu-item-${year}`}>
                                        {year}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
}
