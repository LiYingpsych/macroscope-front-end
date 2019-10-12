import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import RadioButtonsGroup, { IRadioButton } from "../../../../components/inputs/RadioButtonsGroup";
import { ISettingsProps } from "./ISettingsProps";

export enum SentimentTypes {
    VALENCE = "VALENCE",
    AROUSAL = "AROUSAL",
    CONCRETENESS = "CONCRETENESS"
}

export interface ISentimentSettings {
    type: SentimentTypes;
}

interface IProps extends ISettingsProps<ISentimentSettings> {}

const getDefaultOption = (
    options: IRadioButton<SentimentTypes>[],
    type: SentimentTypes
): IRadioButton<SentimentTypes> => {
    for (let index = 0; index < options.length; index++) {
        const option = options[index];

        if (option.value === type) return option;
    }

    return options[0];
};

export default function SentimentSettings(props: IProps) {
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const options: IRadioButton<SentimentTypes>[] = [
        { value: SentimentTypes.VALENCE, label: "Valence" },
        { value: SentimentTypes.AROUSAL, label: "Arousal" },
        { value: SentimentTypes.CONCRETENESS, label: "Concreteness" }
    ];

    let defaultOption = getDefaultOption(options, defaultSettings.type);

    const [settings, setSettings] = useState(defaultSettings);

    const modifySettings = (propName: keyof ISentimentSettings, value: any) => {
        const modifiedSettings = { ...settings, [propName]: value };
        setSettings(modifiedSettings);
        onChange(modifiedSettings);
    };

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <RadioButtonsGroup
                        label="type"
                        options={options}
                        defaultOption={defaultOption}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: string) => {
                            modifySettings("type", selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
