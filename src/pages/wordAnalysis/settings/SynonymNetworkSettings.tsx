import React from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import range from "../../../utils/range";
import { synonymNetworkMinYear, synonymNetworkMaxYear } from "../../../globals";
import { ISettingsProps } from "./ISettingsProps";
import useModifyableObject from "../../../customHooks/useModifyableObject";

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

    const [, handleSettingsChange] = useModifyableObject(defaultSettings, onChange);

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
                            handleSettingsChange((oldSettings: ISynonymNetworkSettings) => {
                                oldSettings.year = selectedYear;
                                return oldSettings;
                            });
                        }}
                    />
                    <NumberSelectionInput
                        label="Synonyms per target"
                        numbers={synonymsPerTarget}
                        defaultNumber={defaultSettings.synonymsPerTarget}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedNumber: number) => {
                            handleSettingsChange((oldSettings: ISynonymNetworkSettings) => {
                                oldSettings.synonymsPerTarget = selectedNumber;
                                return oldSettings;
                            });
                        }}
                    />
                    <NumberSelectionInput
                        label="Simalarity threshold"
                        numbers={simalarityThreshold}
                        defaultNumber={defaultSettings.simalarityThreshold}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedNumber: number) => {
                            handleSettingsChange((oldSettings: ISynonymNetworkSettings) => {
                                oldSettings.simalarityThreshold = selectedNumber;
                                return oldSettings;
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
