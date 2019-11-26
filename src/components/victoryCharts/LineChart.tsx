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
import ICartesianCoordinate from "./models/ICartesianCoordinate";
import { chartColours } from "../../themes/colours";

interface ILine<S, T> {
    coords: ICartesianCoordinate<S, T>[];
    legendLabel: string;
}

type lineChartType = "dateTime" | "default";

interface IProps<S, T> {
    lines: ILine<S, T>[];
    type?: lineChartType;
    dependentAxisProps?: VictoryAxisProps;
    independentAxisProps?: VictoryAxisProps;
}

export default function LineChart<S, T>(props: IProps<S, T>) {
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

    const LinesComponent = lines.map((line, i) => {
        const strokeColour = chartColours[i % chartColours.length].main;

        if (line.coords.length > 0)
            legendData.push({ name: line.legendLabel, symbol: { fill: strokeColour } });

        return (
            <VictoryLine style={{ data: { stroke: strokeColour } }} data={line.coords} key={i} />
        );
    });

    // type cursorDimensionType = "x" | "y" | undefined;
    // const cursorDimension: cursorDimensionType = "x";
    const [cursorCoordinate, setCursorCoordinate] = useState<CursorData>();

    // TODO: submit issue - value returned depends on cursorDimension value when it should still return a CursorData prop
    const handleCursorChange = (value: CursorData, props: VictoryCursorContainerProps) => {
        console.log(value);
        setCursorCoordinate(value);
        // if (typeof cursorDimension === "undefined") setCursorCoordinate({ x: value.x, y: value.y });
        // else if (cursorDimension === "x")
        //     //@ts-ignore
        //     setCursorCoordinate({ x: value, y: undefined });
        // else if (cursorDimension === "y")
        //     //@ts-ignore
        //     setCursorCoordinate({ x: undefined, y: value });
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
                        // cursorDimension={cursorDimension}
                        cursorLabel={data => {
                            return typeof cursorCoordinate !== "undefined"
                                ? `${cursorCoordinate.x}, ${cursorCoordinate.y}`
                                : "";
                        }}
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

                {/* X coordinate line of mouseover */}
                {/* <VictoryLine
                    style={{
                        data: { stroke: "red", strokeWidth: 2 },
                        labels: { fill: "red", fontSize: 20 }
                    }}
                    labels={["Important"]}
                    labelComponent={<VictoryLabel angle={-90} y={100} />}
                    x={() => 2000}
                /> */}
                {/* Intersection point */}
                {/* <VictoryScatter
                    symbol="star"
                    size={8}
                    style={{ data: { fill: "red" } }}
                    data={[{ x: 2000, y: 6 }]}
                /> */}
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
