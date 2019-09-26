import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
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
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

export default function SynonymListSettings() {
    const classes = useStyles();

    const [settings, setSettings] = React.useState({
        year: 1990
    });

    const [isOpen, setIsOpen] = React.useState(false);

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

    const toggleSwitch = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={classes.root}>
            <List dense={true}>
                <ListItem button onClick={toggleSwitch}>
                    <ListItemText primary="Synonym list" />
                    <Switch checked={isOpen} />
                </ListItem>
                <Divider />
            </List>

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
