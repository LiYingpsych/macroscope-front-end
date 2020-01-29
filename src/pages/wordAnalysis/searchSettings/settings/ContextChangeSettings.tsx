import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "components/inputs/NumberSelectionInput";

import range from "utils/range";
import { settingsRanges } from "globalConsts";

import ISettingsProps from "./ISettingsProps";
import IContextChangeSettings from "../../models/IContextChangeSettings";

interface IProps extends ISettingsProps<IContextChangeSettings> {}

export default function ContextChangeSettings(props: IProps) {
    // TODO: make this seletion a slider
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const years: number[] = range(
        settingsRanges.contextChange.years.min,
        settingsRanges.contextChange.years.max,
        10
    );
    const numberOfContextWordsRange: number[] = range(
        settingsRanges.contextChange.numberOfContextWords.min,
        settingsRanges.contextChange.numberOfContextWords.max,
        1
    );

    const [settings, setSettings] = useState(defaultSettings);

    const modifySettings = (propName: keyof IContextChangeSettings, value: number) => {
        const modifiedSettings = { ...settings, [propName]: value };
        setSettings(modifiedSettings);
        onChange(modifiedSettings);
    };

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Start year"
                        numbers={years}
                        defaultNumber={defaultSettings.startYear}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("startYear", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="End year"
                        numbers={years}
                        defaultNumber={defaultSettings.endYear}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("endYear", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Number of context words"
                        numbers={numberOfContextWordsRange}
                        defaultNumber={defaultSettings.numberOfContextWords}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("numberOfContextWords", selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
