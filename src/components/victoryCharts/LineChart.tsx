import React, { useState } from "react";
import ChartWrapper, { ILegendDataProp } from "./ChartWrapper";
import {
    VictoryAxis,
    VictoryLine,
    DomainPropType,
    VictoryZoomContainer,
    VictoryBrushContainer,
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

type lineChartType = "dateTime" | "default";

interface IProps<S extends xCoordType, T extends yCoordType> {
    lines: Lines<S, T>;
    type?: lineChartType;
    dependentAxisProps?: VictoryAxisProps;
    independentAxisProps?: VictoryAxisProps;
}

export default function LineChart<S extends xCoordType, T extends yCoordType>(props: IProps<S, T>) {
    const {
        lines,
        type = "default",
        dependentAxisProps,
        independentAxisProps = { tickFormat: undefined }
    } = props;

    const padding = { left: 60, top: 50, right: 10, bottom: 60 };
    const independentAxisTickFormat =
        type === "dateTime"
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

    const [cursorClosestXCoordinate, setCursorClosestXCoordinate] = useState<S | null>(null);

    // TODO: submit issue - value returned depends on cursorDimension value when it should still return a CursorData prop
    const handleCursorChange = (value: CursorData, props: VictoryCursorContainerProps) => {
        if (typeof value === "undefined" || value === null) setCursorClosestXCoordinate(null);
        else setCursorClosestXCoordinate(lines.getClosestXCoordinate(value.x as S));
    };

    const getIntersectionCoordinates = (): ICartesianCoordinate<S, T>[] => {
        return lines.getYIntersectionCoordinates(cursorClosestXCoordinate);
    };

    const getDomain = (): DomainPropType => {
        return {
            x: [lines.domain.xMin as number, lines.domain.xMax as number],
            y: [lines.domain.yMin as number, lines.domain.yMax as number]
        };
    };

    // const [zoomDomain, setZoomDomain] = useState<DomainPropType>();
    // const handleZoom = (domain: DomainPropType) => {
    //     setZoomDomain(domain);
    // };
    return (
        <>
            <ChartWrapper
                padding={padding}
                // containerComponent={
                //     <VictoryZoomContainer
                //         zoomDimension="x"
                //         zoomDomain={zoomDomain}
                //         onZoomDomainChange={handleZoom}
                //     />
                // }
                containerComponent={
                    <VictoryCursorContainer
                        onCursorChange={handleCursorChange}
                        cursorComponent={<div style={{ display: "none" }}></div>}
                    />
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

                {typeof cursorClosestXCoordinate === "undefined" ||
                cursorClosestXCoordinate === null ? null : (
                    <VictoryLine
                        domain={getDomain()}
                        style={{
                            data: { stroke: "red", strokeWidth: 1 },
                            labels: { fill: "red", fontSize: 20 }
                        }}
                        labels={["Important"]}
                        labelComponent={<VictoryLabel angle={-90} y={lines.domain.yMax} />}
                        x={() => cursorClosestXCoordinate as number}
                    />
                )}
                {typeof cursorClosestXCoordinate === "undefined" ||
                cursorClosestXCoordinate === null ? null : (
                    <VictoryScatter
                        size={3}
                        style={{ data: { fill: "red" } }}
                        data={getIntersectionCoordinates()}
                    />
                )}
            </ChartWrapper>
            {/* <ChartWrapper
                padding={{ top: 0, left: padding.left, right: padding.right, bottom: 30 }}
                height={100}
                width={width}
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={handleZoom}
                    />
                }
            >
                <VictoryAxis tickFormat={(t: any) => ""} />
                {LinesComponent}
            </ChartWrapper> */}
        </>
    );
}

//     <VictoryLine
//     style={{
//       data: { stroke: "red", strokeWidth: 2 },
//       labels: { angle: -90, fill: "red", fontSize: 20 }
//     }}
//     labels={["Important"]}
//     labelComponent={<VictoryLabel y={100}/>}
//     x={() => 5}
//   />
//   <VictoryScatter
//     symbol="star"
//     size={8}npm start
//     style={{ data: { fill: "red" }}}
//     data={[{ x: 5, y: 5 }]}
//   />
