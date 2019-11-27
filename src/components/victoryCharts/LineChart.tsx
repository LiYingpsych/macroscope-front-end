import React from "react";
import ChartWrapper, { ILegendDataProp } from "./ChartWrapper";
import { VictoryAxis, VictoryLine, VictoryAxisProps, VictoryLabel } from "victory";
import { chartColours } from "../../themes/colours";
import Lines from "./Lines";
import { yCoordType, xCoordType } from "./models/ICartesianCoordinate";

import useZoomable from "./hooks/useZoomable";
import useLineChartCursorIndicator from "./hooks/useLineChartCursorIndicator";

type lineChartType = "zoomable" | "default";
type dependentAxisType = "dateTime" | "default";

interface IProps<S extends xCoordType, T extends yCoordType> {
    lines: Lines<S, T>;
    type?: lineChartType;
    dependentAxisType?: dependentAxisType;
    dependentAxisProps?: VictoryAxisProps;
    independentAxisProps?: VictoryAxisProps;
}

export default function LineChart<S extends xCoordType, T extends yCoordType>(props: IProps<S, T>) {
    const {
        lines,
        type = "default",
        dependentAxisType = "default",
        dependentAxisProps = {},
        independentAxisProps = { tickFormat: undefined }
    } = props;

    const padding = { left: 60, top: 50, right: 10, bottom: 100 };

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
        padding: { top: 0, left: padding.left, right: padding.right, bottom: 30 },
        children: LinesComponent
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
                    type === "zoomable"
                        ? zoomableContainerComponent
                        : lineChartCursorIndicatorContainerComponent
                }
                legendData={legendData}
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

                {type === "default" ? lineChartCursorIndicatorLine : null}
                {type === "default" ? lineChartCursorIndicatorIntersectionPoints : null}
            </ChartWrapper>
            {type === "zoomable" ? zoomableBrushComponent : null}
            {type === "default" ? (
                <div style={{ padding: "8px 30px", display: "flex", justifyContent: "end" }}>
                    {lineChartCursorIndicatorYValueDisplay}
                </div>
            ) : null}
        </>
    );
}
