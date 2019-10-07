import React, { useState, useRef, useEffect } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import FormHelperText from "@material-ui/core/FormHelperText";
import { contains } from "../../utils/arrayContains";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
);

type OptionValue = string | number;

export interface ISelectionOption<T extends OptionValue> {
    value: T;
    label: string;
}

interface IProps<T extends OptionValue> {
    label: string;
    options: ISelectionOption<T>[];
    onChange: (value: T) => void;
    defaultOption?: ISelectionOption<T>; // TODO: make nullable - default to first item
    onValidationError?: () => void;
}

export default function SelectionInput<T extends OptionValue>(props: IProps<T>) {
    const classes = useStyles();

    const {
        label,
        options,
        onChange,
        defaultOption = options[0],
        onValidationError = () => {}
    } = props;

    const [errorHelperText, setErrorHelperText] = useState("");

    const clearError = () => {
        setErrorHelperText("");
    };

    const [value, setValue] = useState(defaultOption.value);

    useEffect(() => {
        const defaultIsInArray: boolean = contains(
            options,
            defaultOption,
            (a: ISelectionOption<T>, b: ISelectionOption<T>) => {
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

    const inputLabel = useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);

    const nativeInputLabel = useRef<HTMLLabelElement>(null);
    const [nativeLabelWidth, setNativeLabelWidth] = useState(0);

    useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
        setNativeLabelWidth(nativeInputLabel.current!.offsetWidth);
    }, []);

    function handleOnChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        const selectedValue: T = event.target.value as T;
        clearError();
        setValue(selectedValue);
        onChange(selectedValue);
    }

    const selectComponent = (native: boolean) => {
        const _labelWidth = nativeLabelWidth > labelWidth ? nativeLabelWidth : labelWidth;

        return (
            <Select
                native={native}
                value={value}
                onChange={handleOnChange}
                labelWidth={_labelWidth}
                inputProps={{
                    name: label,
                    id: `${label}-select`
                }}
            >
                {options.map((option: ISelectionOption<T>) => {
                    return native ? (
                        <option value={option.value} key={`${label}-menu-item-${option.value}`}>
                            {option.label}
                        </option>
                    ) : (
                        <MenuItem value={option.value} key={`${label}-menu-item-${option.value}`}>
                            {option.label}
                        </MenuItem>
                    );
                })}
            </Select>
        );
    };

    return (
        <>
            <Hidden xsDown implementation="css">
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    error={errorHelperText !== ""}
                >
                    <InputLabel ref={inputLabel} htmlFor={`${label}-select`}>
                        {label}
                    </InputLabel>
                    {selectComponent(false)}
                    <FormHelperText>{errorHelperText}</FormHelperText>
                </FormControl>
            </Hidden>

            <Hidden smUp implementation="css">
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    error={errorHelperText !== ""}
                >
                    <InputLabel ref={nativeInputLabel} htmlFor={`native-${label}-select`}>
                        {label}
                    </InputLabel>
                    {selectComponent(true)}
                    <FormHelperText>{errorHelperText}</FormHelperText>
                </FormControl>
            </Hidden>
        </>
    );
}
