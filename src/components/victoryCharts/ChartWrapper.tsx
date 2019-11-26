import React, { ReactNode } from "react";
import { VictoryChart, VictoryChartProps } from "victory";
import { createStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import victoryThemes from "../../themes/victoryThemes";

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

interface IProps extends VictoryChartProps {
    children?: ReactNode;
}

export default function ChartWrapper(props: IProps) {
    const classes = useStyles();
    const muiTheme = useTheme();

    const {
        horizontal = false,
        height = 500,
        width = 809,
        children = <div></div>,
        ...rest
    } = props;

    return (
        <div className={classes.root}>
            <VictoryChart
                height={height}
                width={width}
                theme={victoryThemes.defaultTheme(muiTheme)}
                horizontal={horizontal}
                {...rest}
            >
                {children}
            </VictoryChart>
        </div>
    );
}
