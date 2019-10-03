import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

type ButtonValue = string | number;

export interface IRadioButton<T extends ButtonValue> {
    value: T;
    label: string;
}

interface IProps<T extends ButtonValue> {
    label: string;
    options: IRadioButton<T>[];
    defaultOption: IRadioButton<T>; // TODO: make nullable - default to first item
    onChange: (value: T) => void;
}

export default function RadioButtonsGroup<T extends ButtonValue>(props: IProps<T>) {
    const { label, options, onChange, defaultOption } = props;

    const [value, setValue] = React.useState(defaultOption.value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue: T = event.target.value as T;
        setValue(selectedValue);
        onChange(selectedValue);
    };

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
        </FormControl>
    );
}
