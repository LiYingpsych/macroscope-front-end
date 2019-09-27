import React from "react";

import Grid from "@material-ui/core/Grid";
import YearInput from "../../../components/inputs/YearInput";

import range from "../../../utils/range";
import { synonymNetworkMinYear, synonymNetworkMaxYear } from "../../../globals";

export default function SynonymNetworkSettings() {
    const years: number[] = range(synonymNetworkMinYear, synonymNetworkMaxYear, 10);
    const defaultYear = years[years.length - 1];

    return (
        <form autoComplete="off">
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
