import React, { ReactNode } from "react";
import { VictoryChart } from "victory";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import victoryThemes from "../../../../../themes/victoryThemes";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .VictoryContainer": {
                maxWidth: "809px"
            }
        }
    })
);

interface IProps {
    children?: ReactNode;
    horizontal?: boolean;
    height?: number;
    width?: number;
}

export default function ChartWrapper(props: IProps) {
    const classes = useStyles();
    const { horizontal = false, height = 500, width = 809, children = <div></div> } = props;

    return (
        <div className={classes.root}>
            <VictoryChart
                height={height}
                width={width}
                theme={victoryThemes.defaultTheme}
                horizontal={horizontal}
            >
                {children}
            </VictoryChart>
        </div>
    );
}
