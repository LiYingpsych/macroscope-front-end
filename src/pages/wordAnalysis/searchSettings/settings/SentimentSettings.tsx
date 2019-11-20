import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";

import ISettingsProps from "./ISettingsProps";
import ISentimentSettings from "../../models/ISentimentSettings";
import SentimentType from "../../models/enums/SentimentType";
import IRadioButton, {
    RadioButtonValue
} from "../../../../components/inputs/radioButton/IRadioButton";
import RadioButtonsGroup from "../../../../components/inputs/radioButton/RadioButtonsGroup";

interface IProps extends ISettingsProps<ISentimentSettings> {}

export default function SentimentSettings(props: IProps) {
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const options: IRadioButton[] = [
        { value: SentimentType.VALENCE, label: "Valence" },
        { value: SentimentType.AROUSAL, label: "Arousal" },
        { value: SentimentType.CONCRETENESS, label: "Concreteness" }
    ];

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
                        label="Type"
                        options={options}
                        defaultOptionValue={defaultSettings.type}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: RadioButtonValue) => {
                            modifySettings("type", selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
