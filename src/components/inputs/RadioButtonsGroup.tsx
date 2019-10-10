import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { contains } from "../../utils/arrayContains";
import { FormHelperText } from "@material-ui/core";

type ButtonValue = string | number;

export interface IRadioButton<T extends ButtonValue> {
    value: T;
    label: string;
}

interface IProps<T extends ButtonValue> {
    label: string;
    options: IRadioButton<T>[];
    onChange: (value: T) => void;
    defaultOption?: IRadioButton<T>;
    onValidationError?: () => void;
}

export default function RadioButtonsGroup<T extends ButtonValue>(props: IProps<T>) {
    const {
        label,
        options,
        onChange,
        defaultOption = options[0],
        onValidationError = () => {}
    } = props;

    const [value, setValue] = React.useState(defaultOption.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue: T = event.target.value as T;
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
            defaultOption,
            (a: IRadioButton<T>, b: IRadioButton<T>) => {
                return a.value === b.value && a.label === b.label;
            }
        );

        if (value === defaultOption.value && !defaultIsInArray) {
            const validationErrorMessage = `${defaultOption.value} is not a possible option`;
            setErrorHelperText(validationErrorMessage);
            onValidationError();
        } else {
            clearError();
        }
    }, [options, defaultOption, onValidationError, value]);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>

            <RadioGroup value={value} onChange={handleChange}>
                {options.map((option: IRadioButton<T>) => {
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
