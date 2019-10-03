import React from "react";

import Grid from "@material-ui/core/Grid";
import RadioButtonsGroup, { IRadioButton } from "../../../components/inputs/RadioButtonsGroup";

enum SentimentTypes {
    VALENCE = "VALENCE",
    AROUSAL = "AROUSAL",
    CONCRETENESS = "CONCRETENESS"
}

export default function SentimentSettings() {
    const options: IRadioButton<string>[] = [
        { value: SentimentTypes.VALENCE, label: "Valence" },
        { value: SentimentTypes.AROUSAL, label: "Arousal" },
        { value: SentimentTypes.CONCRETENESS, label: "Concreteness" }
    ];

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <RadioButtonsGroup
                        label="type"
                        options={options}
                        defaultOption={options[0]}
                        onChange={(value: string) => {
                            console.log(value);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
