import React, { useState, useEffect } from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import { contains } from "../../../utils/arrayContains";
import IRadioButton, { RadioButtonValue } from "./IRadioButton";

function getDefaultOption(options: IRadioButton[], type?: RadioButtonValue): IRadioButton {
    const firstOption = options[0];

    if (typeof type === "undefined") return firstOption;

    for (let index = 0; index < options.length; index++) {
        const option = options[index];

        if (option.value === type) return option;
    }

    return firstOption;
}

export interface IRadioButtonsGroupProps {
    label: string;
    options: IRadioButton[];
    onChange: (value: RadioButtonValue) => void;
    defaultOption?: IRadioButton;
    defaultOptionValue?: RadioButtonValue;
    onValidationError?: () => void;
}

export default function RadioButtonsGroup(props: IRadioButtonsGroupProps) {
    const {
        label,
        options,
        onChange,
        defaultOption,
        defaultOptionValue,
        onValidationError = () => {}
    } = props;

    const parsedDefaultOption =
        typeof defaultOption === "undefined"
            ? getDefaultOption(options, defaultOptionValue)
            : defaultOption;

    const [value, setValue] = React.useState(parsedDefaultOption.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue: RadioButtonValue = event.target.value as RadioButtonValue;
        setValue(selectedValue);
        onChange(selectedValue);
    };

    const [errorHelperText, setErrorHelperText] = useState("");

    const clearError = () => {
        setErrorHelperText("");
    };

    useEffect(() => {
        const defaultIsInArray: boolean = contains(
            options,
            parsedDefaultOption,
            (a: IRadioButton, b: IRadioButton) => {
                return a.value === b.value && a.label === b.label;
            }
        );

        if (value === parsedDefaultOption.value && !defaultIsInArray) {
            const validationErrorMessage = `${parsedDefaultOption.value} is not a possible option`;
            setErrorHelperText(validationErrorMessage);
            onValidationError();
        } else {
            clearError();
        }
    }, [options, parsedDefaultOption, onValidationError, value]);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>

            <RadioGroup value={value} onChange={handleChange}>
                {options.map((option: IRadioButton) => {
                    return (
                        <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio color="primary" />}
                            label={option.label}
                        />
                    );
                })}
            </RadioGroup>
            <FormHelperText>{errorHelperText}</FormHelperText>
        </FormControl>
    );
}
