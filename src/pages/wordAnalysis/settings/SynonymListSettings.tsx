import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { closestMaxYear, closestMinYear } from "../../../globals";
import YearInput from "../../../components/inputs/YearInput";
import range from "../../../utils/range";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap"
        }
    })
);

export default function SynonymListSettings() {
    const classes = useStyles();

    const years: number[] = range(closestMinYear, closestMaxYear, 10);
    const defaultYear = years[years.length - 1];

    // TODO: add check to see if default is contained in year
    // Also add error highlighting if selected default is not an option (will be necessary when search is done by url)
    // checkSelectionDefault(years, defaultYear)

    return (
        <form className={classes.root} autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <YearInput
                        years={years}
                        defaultYear={defaultYear}
                        onChange={(selectedYear: number) => {
                            console.log(selectedYear);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
