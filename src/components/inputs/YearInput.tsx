import React from "react";

import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
);

interface IProps {
    years: number[];
    defaultYear: number;
    onChange: (selectedYear: number) => void;
}

export default function YearInput(props: IProps) {
    const classes = useStyles();

    const { years, defaultYear, onChange } = props;

    const [year, setYear] = React.useState(defaultYear);

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setYear(event.target.value as number);
        onChange(event.target.value as number);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="year-select">
                Year
            </InputLabel>
            <Select
                value={year}
                onChange={handleSelectChange}
                labelWidth={labelWidth}
                inputProps={{
                    name: "year",
                    id: "year-select"
                }}
            >
                {years.map((year: number) => {
                    return (
                        <MenuItem value={year} key={`menu-item-${year}`}>
                            {year}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

// <Fragment>
// {/* <Hidden xsDown> */}
// {/* </Hidden> */}
// {/* <Hidden smUp>
//     <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel ref={inputLabel} htmlFor="year-select">
//             Year
//         </InputLabel>
//         <Select
//             native
//             value={settings.year}
//             onChange={handleSelectChange}
//             labelWidth={labelWidth}
//             inputProps={{
//                 name: "year",
//                 id: "year-select"
//             }}
//         >
//             {years.map((year: number) => {
//                 return (
//                     <option value={year} key={`menu-item-${year}`}>
//                         {year}
//                     </option>
//                 );
//             })}
//         </Select>
//     </FormControl>
// </Hidden> */}
// </Fragment>
