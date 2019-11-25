import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        root: {}
    })
);

interface IProps {}

export default function LineChart(props: IProps) {
    const classes = useStyles();

    return <div className={classes.root}></div>;
}
