import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import RadioButtonsGroup, { IRadioButton } from "../../../../components/inputs/RadioButtonsGroup";

import ISettingsProps from "./ISettingsProps";
import ISentimentSettings from "../../models/ISentimentSettings";
import SentimentType from "../../models/SentimentType";

interface IProps extends ISettingsProps<ISentimentSettings> {}

const getDefaultOption = (
    options: IRadioButton<SentimentType>[],
    type: SentimentType
): IRadioButton<SentimentType> => {
    for (let index = 0; index < options.length; index++) {
        const option = options[index];

        if (option.value === type) return option;
    }

    return options[0];
};

export default function SentimentSettings(props: IProps) {
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const options: IRadioButton<SentimentType>[] = [
        { value: SentimentType.VALENCE, label: "Valence" },
        { value: SentimentType.AROUSAL, label: "Arousal" },
        { value: SentimentType.CONCRETENESS, label: "Concreteness" }
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
