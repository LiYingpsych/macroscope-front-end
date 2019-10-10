import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import range from "../../../utils/range";
import { synonymNetworkMinYear, synonymNetworkMaxYear } from "../../../globals";
import { ISettingsProps } from "./ISettingsProps";

export interface ISynonymNetworkSettings {
    year: number;
    synonymsPerTarget: number;
    simalarityThreshold: number;
}

interface IProps extends ISettingsProps<ISynonymNetworkSettings> {}

export default function SynonymNetworkSettings(props: IProps) {
    // TODO: add additional target words
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const years: number[] = range(synonymNetworkMinYear, synonymNetworkMaxYear, 10);
    const synonymsPerTarget: number[] = range(3, 10);
    const simalarityThreshold: number[] = range(50, 100).map((value: number) => {
        return value / 100;
    });

    const [settings, setSettings] = useState(defaultSettings);

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Year"
                        numbers={years}
                        defaultNumber={defaultSettings.year}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedYear: number) => {
                            const modifiedSettings = { ...settings, year: selectedYear };
                            setSettings(modifiedSettings);
                            onChange(modifiedSettings);
                        }}
                    />
                    <NumberSelectionInput
                        label="Synonyms per target"
                        numbers={synonymsPerTarget}
                        defaultNumber={defaultSettings.synonymsPerTarget}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedNumber: number) => {
                            const modifiedSettings = {
                                ...settings,
                                synonymsPerTarget: selectedNumber
                            };
                            setSettings(modifiedSettings);
                            onChange(modifiedSettings);
                        }}
                    />
                    <NumberSelectionInput
                        label="Simalarity threshold"
                        numbers={simalarityThreshold}
                        defaultNumber={defaultSettings.simalarityThreshold}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedNumber: number) => {
                            const modifiedSettings = {
                                ...settings,
                                simalarityThreshold: selectedNumber
                            };
                            setSettings(modifiedSettings);
                            onChange(modifiedSettings);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
