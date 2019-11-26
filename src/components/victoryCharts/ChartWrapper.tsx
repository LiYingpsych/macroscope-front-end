import React, { ReactNode } from "react";
import { VictoryChart, VictoryChartProps, VictoryLegend, BlockProps } from "victory";
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

export interface ILegendDataProp {
    name?: string;
    symbol?: {
        fill?: string;
        type?: string;
    };
}

interface IProps extends VictoryChartProps {
    children?: ReactNode;
    legendData?: ILegendDataProp[];
    padding?: BlockProps;
}

export default function ChartWrapper(props: IProps) {
    const classes = useStyles();
    const muiTheme = useTheme();

    const {
        children = <div></div>,
        legendData = [],
        padding = { left: 50, top: 50, right: 10, bottom: 100 },
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

    return (
        <div className={classes.root}>
            <VictoryChart
                height={height}
                width={width}
                theme={victoryThemes.defaultTheme(muiTheme)}
                horizontal={horizontal}
                padding={padding}
                {...rest}
            >
                {children}
                {Legend}
            </VictoryChart>
        </div>
    );
}
