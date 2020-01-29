import React, { ReactNode } from "react";
import { VictoryChart, VictoryChartProps, VictoryLegend, BlockProps } from "victory";
import { createStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import victoryThemes from "themes/victoryThemes";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            display: "flex",
            justifyContent: "center"
        }
    })
);

export interface ILegendDataProp {
    name?: string;
    symbol?: {
        fill?: string;
        type?: string;
    };
}

export interface IChartWrapperProps extends VictoryChartProps {
    children?: ReactNode;
    legendData?: ILegendDataProp[];
    padding?: BlockProps;
}

export default function ChartWrapper(props: IChartWrapperProps) {
    const classes = useStyles();
    const muiTheme = useTheme();

    const defaultPaddingObject = { left: 50, top: 50, right: 10, bottom: 60 };

    const {
        children = <div></div>,
        legendData = [],
        padding = defaultPaddingObject,
        horizontal = false,
        height = 500,
        width = 809,
        ...rest
    } = props;

    const Legend =
        legendData.length > 1 ? (
            <VictoryLegend
                x={padding.left}
                y={height - 30}
                orientation="horizontal"
                itemsPerRow={5}
                data={legendData}
            />
        ) : null;

    const calculateAdjustedPadding = (): BlockProps => {
        const legendPadding = legendData.length > 1 ? 30 : 0;
        return {
            left: typeof padding.left === "undefined" ? defaultPaddingObject.left : padding.left,
            top: typeof padding.top === "undefined" ? defaultPaddingObject.top : padding.top,
            right:
                typeof padding.right === "undefined" ? defaultPaddingObject.right : padding.right,
            bottom:
                typeof padding.bottom === "undefined"
                    ? defaultPaddingObject.bottom + legendPadding
                    : padding.bottom + legendPadding
        };
    };

    return (
        <div className={classes.root}>
            <VictoryChart
                height={height}
                width={width}
                theme={victoryThemes.defaultTheme(muiTheme)}
                horizontal={horizontal}
                padding={calculateAdjustedPadding()}
                {...rest}
            >
                {children}
                {Legend}
            </VictoryChart>
        </div>
    );
}
