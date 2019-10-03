import React from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import range from "../../../utils/range";

export default function ContextChangeSettings() {
    // TODO: make this seletion a slider

    const contextChangeMinYear = 1800;
    const contextChangeMaxYear = 2000;

    const years: number[] = range(contextChangeMinYear, contextChangeMaxYear, 10);
    const startYearDefault = years[0];
    const endYearDefault = years[years.length - 1];

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Start year"
                        numbers={years}
                        defaultNumber={startYearDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="End year"
                        numbers={years}
                        defaultNumber={endYearDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
