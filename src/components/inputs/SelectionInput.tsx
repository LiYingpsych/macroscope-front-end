import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";

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
    defaultOption: ISelectionOption<T>;
    onChange: (value: T) => void;
}

export default function SelectionInput<T extends OptionValue>(props: IProps<T>) {
    const classes = useStyles();

    const { label, options, onChange } = props;

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    const nativeInputLabel = React.useRef<HTMLLabelElement>(null);
    const [nativeLabelWidth, setNativeLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
        setNativeLabelWidth(nativeInputLabel.current!.offsetWidth);
    }, []);

    const [value, setValue] = React.useState(props.defaultOption.value);

    function handleOnChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        const selectedValue: T = event.target.value as T;
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
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor={`${label}-select`}>
                        {label}
                    </InputLabel>
                    {selectComponent(false)}
                </FormControl>
            </Hidden>

            <Hidden smUp implementation="css">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={nativeInputLabel} htmlFor={`native-${label}-select`}>
                        {label}
                    </InputLabel>
                    {selectComponent(true)}
                </FormControl>
            </Hidden>
        </>
    );
}
