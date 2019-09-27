import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { closestMaxYear, closestMinYear } from "../../../globals";
import YearInput from "../../../components/inputs/YearInput";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap"
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

    return (
        <form className={classes.root} autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <YearInput
                        years={years}
                        defaultYear={years[years.length - 1]}
                        onChange={(selectedYear: number) => {
                            console.log(selectedYear);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
