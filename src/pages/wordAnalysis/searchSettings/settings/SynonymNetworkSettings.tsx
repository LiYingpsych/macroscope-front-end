import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../../components/inputs/NumberSelectionInput";

import range from "../../../../utils/range";
import { settingsRanges } from "../../../../globals";

import ISettingsProps from "./ISettingsProps";
import ISynonymNetworkSettings from "../../models/ISynonymNetworkSettings";

interface IProps extends ISettingsProps<ISynonymNetworkSettings> {}

export default function SynonymNetworkSettings(props: IProps) {
    // TODO: add additional target words
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const years: number[] = range(
        settingsRanges.synonymNetwork.years.min,
        settingsRanges.synonymNetwork.years.max,
        10
    );
    const synonymsPerTarget: number[] = range(3, 10);
    const similarityThreshold: number[] = range(50, 100).map((value: number) => {
        return value / 100;
    });

    const [settings, setSettings] = useState(defaultSettings);

    const modifySettings = (propName: keyof ISynonymNetworkSettings, value: number) => {
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
                        label="Synonyms per target"
                        numbers={synonymsPerTarget}
                        defaultNumber={defaultSettings.synonymsPerTarget}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("synonymsPerTarget", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Similarity  threshold"
                        numbers={similarityThreshold}
                        defaultNumber={defaultSettings.similarityThreshold}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("similarityThreshold", selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
