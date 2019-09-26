import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
);

export default function SynonymListSettings() {
    const classes = useStyles();

    const [settings, setSettings] = React.useState({
        year: 1990
    });

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSettings(oldValues => ({
            ...oldValues,
            [event.target.name as string]: event.target.value
        }));
    };

    return (
        <div className={classes.root}>
            <form autoComplete="off">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="year-select">
                        Year
                    </InputLabel>
                    <Select
                        value={settings.year}
                        onChange={handleSelectChange}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: "year",
                            id: "year-select"
                        }}
                    >
                        <MenuItem value={1980}>1980</MenuItem>
                        <MenuItem value={1990}>1990</MenuItem>
                        <MenuItem value={2000}>2000</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </div>
    );
}
