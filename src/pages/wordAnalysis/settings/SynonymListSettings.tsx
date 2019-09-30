import React from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import { closestMaxYear, closestMinYear } from "../../../globals";
import range from "../../../utils/range";

export default function SynonymListSettings() {
    const years: number[] = range(closestMinYear, closestMaxYear, 10);
    const defaultYear = years[years.length - 1];

    const numberOfSynonyms: number[] = range(1, 100);
    const defaultNumberOfSynonyms = 5;

    // TODO: add check to see if default is contained in year
    // Also add error highlighting if selected default is not an option (will be necessary when search is done by url)
    // checkSelectionDefault(years, defaultYear)

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Year"
                        numbers={years}
                        defaultNumber={defaultYear}
                        onChange={(selectedYear: number) => {
                            console.log(selectedYear);
                        }}
                    />
                    <NumberSelectionInput
                        label="Number of synonyms"
                        numbers={numberOfSynonyms}
                        defaultNumber={defaultNumberOfSynonyms}
                        onChange={(selectedNUmber: number) => {
                            console.log(selectedNUmber);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
