import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../../components/inputs/NumberSelectionInput";
import { ISettingsProps } from "./ISettingsProps";

import range from "../../../../utils/range";
import { closestMaxYear, closestMinYear } from "../../../../globals";

export interface ISynonymListSettings {
    year: number;
    numberOfSynonyms: number;
}

interface IProps extends ISettingsProps<ISynonymListSettings> {}

export default function SynonymListSettings(props: IProps) {
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const years: number[] = range(closestMinYear, closestMaxYear, 10);
    const numberOfSynonyms: number[] = range(1, 100);

    // TODO: check defaultSettings are valid
    // TODO: add check to see if default is contained in year
    // Also add error highlighting if selected default is not an option (will be necessary when search is done by url)
    // checkSelectionDefault(years, defaultYear)

    const [settings, setSettings] = useState(defaultSettings);

    const modifySettings = (propName: keyof ISynonymListSettings, value: number) => {
        const modifiedSettings = { ...settings, [propName]: value };
        setSettings(modifiedSettings);
        onChange(modifiedSettings);
    };

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Year"
                        numbers={years}
                        defaultNumber={defaultSettings.year}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("year", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Number of synonyms"
                        numbers={numberOfSynonyms}
                        defaultNumber={defaultSettings.numberOfSynonyms}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("numberOfSynonyms", selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
