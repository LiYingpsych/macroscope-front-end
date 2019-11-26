import React, { useState } from "react";
import ChartWrapper, { ILegendDataProp } from "./ChartWrapper";
import {
    VictoryAxis,
    VictoryLine,
    DomainPropType,
    VictoryAxisProps,
    VictoryLabel,
    VictoryScatter,
    VictoryCursorContainer,
    CursorData,
    VictoryCursorContainerProps
} from "victory";
import { chartColours } from "../../themes/colours";
import Lines from "./Lines";
import ICartesianCoordinate, { yCoordType, xCoordType } from "./models/ICartesianCoordinate";
import { useTheme } from "@material-ui/core/styles";
import useZoomable from "./hooks/useZoomable";

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
        dependentAxisProps,
        independentAxisProps = { tickFormat: undefined }
    } = props;
    const theme = useTheme();

    const padding = { left: 60, top: 50, right: 10, bottom: 60 };

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

    const [cursorClosestXCoordinate, setCursorClosestXCoordinate] = useState<S | null>();
    const [intersectionCoords, setIntersectionCoords] = useState<ICartesianCoordinate<S, T>[]>();

    // TODO: submit issue - value returned depends on cursorDimension value when it should still return a CursorData prop
    const handleCursorChange = (value: CursorData, props: VictoryCursorContainerProps) => {
        if (typeof value === "undefined" || value === null) setCursorClosestXCoordinate(null);
        else {
            const _closestX = lines.getClosestXCoordinate(value.x as S);
            setCursorClosestXCoordinate(_closestX);
            updateIntersectionCoordinates(_closestX);
        }
    };

    const updateIntersectionCoordinates = (x: S) => {
        const _intersectionCoords = lines.getYIntersectionCoordinates(x);
        setIntersectionCoords(_intersectionCoords);
    };

    const getDomain = (): DomainPropType => {
        return {
            x: [lines.domain.xMin as number, lines.domain.xMax as number],
            y: [lines.domain.yMin as number, lines.domain.yMax as number]
        };
    };

    const { zoomableContainerComponent, ZoomableBrush } = useZoomable();

    const containerComponent =
        type === "zoomable" ? (
            zoomableContainerComponent
        ) : (
            <VictoryCursorContainer
                onCursorChange={handleCursorChange}
                cursorComponent={<div style={{ display: "none" }}></div>}
            />
        );

    const defaultChartCursorLine =
        typeof cursorClosestXCoordinate === "undefined" ||
        cursorClosestXCoordinate === null ? null : (
            <VictoryLine
                domain={getDomain()}
                style={{
                    data: { stroke: theme.palette.grey[600], strokeWidth: 1 },
                    labels: {
                        fill: theme.palette.secondary.main,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: theme.typography.fontSize
                    }
                }}
                x={() => cursorClosestXCoordinate as number}
                // --- For some reason removing the following lines result in a bug ---
                labels={[cursorClosestXCoordinate.toString()]}
                labelComponent={<VictoryLabel renderInPortal dy={16} />}
                // --- ----
            />
        );
    const defaultChartCursorIntersectionPoints =
        typeof cursorClosestXCoordinate === "undefined" ||
        cursorClosestXCoordinate === null ||
        typeof intersectionCoords === "undefined"
            ? null
            : intersectionCoords.map((coord, i) => {
                  return (
                      <VictoryScatter
                          key={i}
                          size={4}
                          style={{ data: { fill: chartColours[i].intersectionDot } }}
                          data={[coord]}
                      />
                  );
              });

    return (
        <>
            {typeof intersectionCoords === "undefined"
                ? null
                : intersectionCoords.map((coord, i) => {
                      return (
                          <div key={i} style={{ color: chartColours[i].main }}>
                              {coord.x}, {coord.y}
                          </div>
                      );
                  })}
            <ChartWrapper
                padding={padding}
                containerComponent={containerComponent}
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
                {type === "default"
                    ? [defaultChartCursorLine, defaultChartCursorIntersectionPoints]
                    : null}
            </ChartWrapper>
            {type === "zoomable" ? (
                <ZoomableBrush
                    padding={{ top: 0, left: padding.left, right: padding.right, bottom: 30 }}
                >
                    {LinesComponent}
                </ZoomableBrush>
            ) : null}
        </>
    );
}
