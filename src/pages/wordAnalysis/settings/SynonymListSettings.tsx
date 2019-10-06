import React from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import { closestMaxYear, closestMinYear } from "../../../globals";
import range from "../../../utils/range";
import useModifyableObject from "../../../customHooks/useModifyableObject";

export interface ISynonymListSettings {
    year: number;
    numberOfSynonyms: number;
}

interface IProps {
    onChange: (settings: ISynonymListSettings) => void;
    defaultSettings: ISynonymListSettings;
}

export default function SynonymListSettings(props: IProps) {
    const { onChange, defaultSettings } = props;

    const years: number[] = range(closestMinYear, closestMaxYear, 10);
    const numberOfSynonyms: number[] = range(1, 100);

    // TODO: check defaultSettings are valid
    // TODO: add check to see if default is contained in year
    // Also add error highlighting if selected default is not an option (will be necessary when search is done by url)
    // checkSelectionDefault(years, defaultYear)

    const [, handleSettingsChange] = useModifyableObject(defaultSettings, onChange);

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Year"
                        numbers={years}
                        defaultNumber={defaultSettings.year}
                        onChange={(selectedYear: number) => {
                            handleSettingsChange((oldSettings: ISynonymListSettings) => {
                                oldSettings.year = selectedYear;
                                return oldSettings;
                            });
                        }}
                    />
                    <NumberSelectionInput
                        label="Number of synonyms"
                        numbers={numberOfSynonyms}
                        defaultNumber={defaultSettings.numberOfSynonyms}
                        onChange={(selectedNumber: number) => {
                            handleSettingsChange((oldSettings: ISynonymListSettings) => {
                                oldSettings.numberOfSynonyms = selectedNumber;
                                return oldSettings;
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
