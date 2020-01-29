import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "components/inputs/NumberSelectionInput";

import range from "utils/range";
import { settingsRanges } from "globals";

import ISettingsProps from "./ISettingsProps";
import IContextNetworkSettings from "../../models/IContextNetworkSettings";
import ContextNetworkMethod from "../../models/enums/ContextNetworkMethod";
import IRadioButton, { RadioButtonValue } from "components/inputs/radioButton/IRadioButton";
import RadioButtonsGroup from "components/inputs/radioButton/RadioButtonsGroup";

interface IProps extends ISettingsProps<IContextNetworkSettings> {}

export default function ContextNetworkSettings(props: IProps) {
    const { onChange, defaultSettings, onInvalidSettings } = props;

    const years: number[] = range(
        settingsRanges.contextNetwork.years.min,
        settingsRanges.contextNetwork.years.max,
        10
    );
    const maximumNodes: number[] = range(10, 400, 10);
    const contextRelevance: number[] = range(10, 100, 5).map((value: number) => {
        return value / 100;
    });
    const contextCohesiveness: number[] = range(10, 100, 5).map((value: number) => {
        return value / 100;
    });
    const individualWordRelevance: number[] = range(20, 40).map((value: number) => {
        return value / 10;
    });
    const minimumEdges: number[] = range(4, 6);
    const displayNodes: number[] = range(20, 200, 5);

    const methodOptions: IRadioButton[] = [
        { value: ContextNetworkMethod.COR, label: "COR" },
        { value: ContextNetworkMethod.PMI, label: "PMI" }
    ];

    const [settings, setSettings] = useState(defaultSettings);

    const modifySettings = (propName: keyof IContextNetworkSettings, value: number | string) => {
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
                        label="Maximum nodes"
                        numbers={maximumNodes}
                        defaultNumber={defaultSettings.maximumNodes}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("maximumNodes", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Context relevance"
                        numbers={contextRelevance}
                        defaultNumber={defaultSettings.contextRelevance}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("contextRelevance", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Context cohesiveness"
                        numbers={contextCohesiveness}
                        defaultNumber={defaultSettings.contextCohesiveness}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("contextCohesiveness", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Individual word relevance"
                        numbers={individualWordRelevance}
                        defaultNumber={defaultSettings.individualWordRelevance}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("individualWordRelevance", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Minimum edges"
                        numbers={minimumEdges}
                        defaultNumber={defaultSettings.minimumEdges}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("minimumEdges", selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Display nodes"
                        numbers={displayNodes}
                        defaultNumber={defaultSettings.displayNodes}
                        onValidationError={onInvalidSettings}
                        onChange={(selectedValue: number) => {
                            modifySettings("displayNodes", selectedValue);
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
