import React from "react";
import { useTheme } from "@material-ui/core/styles";

import ChartWrapper, { ILegendDataProp } from "../ChartWrapper";
import { VictoryAxis, VictoryLine, VictoryAxisProps, VictoryLabel } from "victory";
import chartColours from "../../../themes/colours/chartColours";

import Lines from "./Lines";
import { yCoordType, xCoordType } from "../models/ICartesianCoordinate";

import useZoomable from "../commonHooks/useZoomable";
import useLineChartCursorIndicator from "./hooks/useLineChartCursorIndicator";

export type lineChartVariant = "zoomable" | "default";
type dependentAxisType = "dateTime" | "default";

export interface ILineChartProps<S extends xCoordType, T extends yCoordType> {
    lines: Lines<S, T>;
    dependentAxisType?: dependentAxisType;
    dependentAxisProps?: VictoryAxisProps;
    independentAxisProps?: VictoryAxisProps;
    variant?: lineChartVariant;
    width?: number;
}

export default function LineChart<S extends xCoordType, T extends yCoordType>(
    props: ILineChartProps<S, T>
) {
    const {
        lines,
        variant = "default",
        dependentAxisType = "default",
        dependentAxisProps = {},
        independentAxisProps = { tickFormat: undefined },
        width
    } = props;

    const theme = useTheme();

    const padding = { left: 60, top: 20, right: 10, bottom: 60 };

    const independentAxisTickFormat =
        dependentAxisType === "dateTime"
            ? (x: any) => new Date(x, 0).getFullYear()
            : independentAxisProps.tickFormat;

    let legendData: ILegendDataProp[] = [];
    const LinesComponent = lines.items.map((line, i) => {
        const strokeColour = chartColours[i % chartColours.length].main;

        if (line.coords.length > 0)
            legendData.push({ name: line.legendLabel, symbol: { fill: strokeColour } });

        return (
            <VictoryLine style={{ data: { stroke: strokeColour } }} data={line.coords} key={i} />
        );
    });

    const { zoomableContainerComponent, zoomableBrushComponent } = useZoomable({
        dimension: "x",
        brushOptions: {
            padding: { top: 0, left: padding.left, right: padding.right, bottom: 0 },
            children: LinesComponent,
            width: width
        }
    });

    const {
        lineChartCursorIndicatorContainerComponent,
        lineChartCursorIndicatorLine,
        lineChartCursorIndicatorIntersectionPoints,
        lineChartCursorIndicatorYValueDisplay
    } = useLineChartCursorIndicator({ lines, dependentAxisName: dependentAxisProps.label });

    return (
        <>
            <ChartWrapper
                padding={padding}
                containerComponent={
                    variant === "zoomable"
                        ? zoomableContainerComponent
                        : lineChartCursorIndicatorContainerComponent
                }
                legendData={legendData}
                domainPadding={{ y: 15 }}
                width={width}
            >
                <VictoryAxis
                    dependentAxis
                    axisLabelComponent={<VictoryLabel dy={-35} />}
                    {...dependentAxisProps}
                />
                <VictoryAxis
                    tickFormat={independentAxisTickFormat}
                    axisLabelComponent={<VictoryLabel dy={30} />}
                    {...independentAxisProps}
                />

                {LinesComponent}

                {variant === "default" ? lineChartCursorIndicatorLine : null}
                {variant === "default" ? lineChartCursorIndicatorIntersectionPoints : null}
            </ChartWrapper>
            {variant === "zoomable" ? zoomableBrushComponent : null}
            {variant === "default" ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: `0px ${theme.spacing(1)}px`
                    }}
                >
                    {lineChartCursorIndicatorYValueDisplay}
                </div>
            ) : null}
        </>
    );
}
