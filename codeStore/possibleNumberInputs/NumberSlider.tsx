import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles({
    root: {
        width: 250
    },
    input: {
        width: 42
    }
});

interface IProps {
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number
}

export default function NumberSlider(props: IProps) {
    const classes = useStyles();
    const { label, min, max, step, defaultValue } = props;
    // const [value, setValue] = React.useState<number | string | Array<number | string>>(30);
    
    let _defaultValue = defaultValue
    if (_defaultValue < min) {
        _defaultValue = min
    } else if (_defaultValue > max) {
        _defaultValue = max
    }
    const [value, setValue] = React.useState<number | Array<number | string>>(_defaultValue);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < min) {
            setValue(min);
        } else if (value > max) {
            setValue(max);
        }
    };

    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
                {label}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === "number" ? value : _defaultValue}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={min}
                        max={max}
                        step={step}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: step,
                            min: min,
                            max: max,
                            type: "number",
                            "aria-labelledby": "input-slider"
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
