import React from "react";

import Grid from "@material-ui/core/Grid";
import YearInput from "../../../components/inputs/YearInput";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import range from "../../../utils/range";
import { synonymNetworkMinYear, synonymNetworkMaxYear } from "../../../globals";

export default function SynonymNetworkSettings() {
    // TODO: add additional target words

    const years: number[] = range(synonymNetworkMinYear, synonymNetworkMaxYear, 10);
    const defaultYear = years[years.length - 1];

    const synonymsPerTarget: number[] = range(3, 10);
    const defaultSynonymsPerTarget = 5;

    const simalarityThreshold: number[] = range(50, 100).map((value: number) => {
        return value / 100;
    });
    const defaultSimalarityThreshold = 0.7;

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
                    <NumberSelectionInput
                        label="Synonyms per target"
                        numbers={synonymsPerTarget}
                        defaultNumber={defaultSynonymsPerTarget}
                        onChange={(selectedNUmber: number) => {
                            console.log(selectedNUmber);
                        }}
                    />
                    <NumberSelectionInput
                        label="Simalarity threshold"
                        numbers={simalarityThreshold}
                        defaultNumber={defaultSimalarityThreshold}
                        onChange={(selectedNUmber: number) => {
                            console.log(selectedNUmber);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
