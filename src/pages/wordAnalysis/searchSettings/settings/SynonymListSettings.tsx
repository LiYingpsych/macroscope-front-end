import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../../components/inputs/NumberSelectionInput";

import range from "../../../../utils/range";
import { closestMaxYear, closestMinYear } from "../../../../globals";

import ISettingsProps from "./ISettingsProps";
import ISynonymListSettings from "../../models/ISynonymListSettings";
import RadioButtonsGroup from "../../../../components/inputs/radioButton/RadioButtonsGroup";
import SynonymListMethod from "../../models/SynonymListMethod";
import IRadioButton, {
    RadioButtonValue
} from "../../../../components/inputs/radioButton/IRadioButton";

interface IProps extends ISettingsProps<ISynonymListSettings> {}

export default function SynonymListSettings(props: IProps) {
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const years: number[] = range(closestMinYear, closestMaxYear, 10);
    const numberOfSynonyms: number[] = range(1, 100);

    const methodOptions: IRadioButton[] = [
        { value: SynonymListMethod.SGNS, label: "SGNS" },
        { value: SynonymListMethod.SVD, label: "SVD" }
    ];

    // TODO: check defaultSettings are valid
    // TODO: add check to see if default is contained in year
    // Also add error highlighting if selected default is not an option (will be necessary when search is done by url)
    // checkSelectionDefault(years, defaultYear)

    const [settings, setSettings] = useState(defaultSettings);

    const modifySettings = (propName: keyof ISynonymListSettings, value: any) => {
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
                    <RadioButtonsGroup
                        label="Method"
                        options={methodOptions}
                        defaultOptionValue={defaultSettings.method}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: RadioButtonValue) => {
                            modifySettings("method", selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
