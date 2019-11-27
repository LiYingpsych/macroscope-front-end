import React, { useState } from "react";
import ChartWrapper, { ILegendDataProp } from "./ChartWrapper";
import { VictoryAxis, VictoryLine, VictoryAxisProps, VictoryLabel } from "victory";
import { chartColours } from "../../themes/colours";
import Lines from "./Lines";
import { yCoordType, xCoordType } from "./models/ICartesianCoordinate";

import useZoomable from "./hooks/useZoomable";
import useLineChartCursorIndicator from "./hooks/useLineChartCursorIndicator";
import SelectionInput, { ISelectionOption } from "../inputs/SelectionInput";
import { useTheme } from "@material-ui/core/styles";

type lineChartVariant = "zoomable" | "default";
type dependentAxisType = "dateTime" | "default";

interface IProps<S extends xCoordType, T extends yCoordType> {
    lines: Lines<S, T>;
    dependentAxisType?: dependentAxisType;
    dependentAxisProps?: VictoryAxisProps;
    independentAxisProps?: VictoryAxisProps;
    variant?: lineChartVariant;
    showVariantSelectionComponent?: boolean;
}

export default function LineChart<S extends xCoordType, T extends yCoordType>(props: IProps<S, T>) {
    const {
        lines,
        variant = "default",
        dependentAxisType = "default",
        dependentAxisProps = {},
        independentAxisProps = { tickFormat: undefined },
        showVariantSelectionComponent = false
    } = props;

    const theme = useTheme();

    const padding = { left: 60, top: 0, right: 10, bottom: 100 };

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

    const [chartVariant, setChartVariant] = useState(variant);
    const variantSelectionOptions: ISelectionOption<lineChartVariant>[] = [
        { value: "default", label: "default" },
        { value: "zoomable", label: "zoomable" }
    ];

    let defaultVariantOption = variantSelectionOptions[0];
    for (let index = 0; index < variantSelectionOptions.length; index++) {
        const option = variantSelectionOptions[index];

        if (option.value !== variant) continue;

        defaultVariantOption = option;
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                    style={{
                        flex: "1 0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: 809
                    }}
                >
                    {showVariantSelectionComponent ? (
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <SelectionInput<lineChartVariant>
                                label="chart variant"
                                options={variantSelectionOptions}
                                onChange={(value: lineChartVariant) => setChartVariant(value)}
                                defaultOption={defaultVariantOption}
                            />
                        </div>
                    ) : null}
                    {chartVariant === "default" ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                flex: "1 0 auto",
                                padding: theme.spacing(1)
                            }}
                        >
                            {lineChartCursorIndicatorYValueDisplay}
                        </div>
                    ) : null}
                </div>
            </div>
            <ChartWrapper
                padding={padding}
                containerComponent={
                    chartVariant === "zoomable"
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

                {chartVariant === "default" ? lineChartCursorIndicatorLine : null}
                {chartVariant === "default" ? lineChartCursorIndicatorIntersectionPoints : null}
            </ChartWrapper>
            {chartVariant === "zoomable" ? zoomableBrushComponent : null}
        </>
    );
}
