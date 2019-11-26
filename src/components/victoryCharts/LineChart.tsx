import React, { useState } from "react";
import ChartWrapper, { ILegendDataProp } from "./ChartWrapper";
import {
    VictoryAxis,
    VictoryLine,
    DomainPropType,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryAxisProps,
    VictoryLabel
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

    const [zoomDomain, setZoomDomain] = useState<DomainPropType>();

    const handleZoom = (domain: DomainPropType) => {
        setZoomDomain(domain);
    };

    let legendData: ILegendDataProp[] = [];

    const LinesComponent = lines.map((line, i) => {
        const strokeColour = chartColours[i % chartColours.length].main;

        if (line.coords.length > 0)
            legendData.push({ name: line.legendLabel, symbol: { fill: strokeColour } });

        return (
            <VictoryLine style={{ data: { stroke: strokeColour } }} data={line.coords} key={i} />
        );
    });

    return (
        <>
            <ChartWrapper
                padding={padding}
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        onZoomDomainChange={handleZoom}
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
            </ChartWrapper>
            <ChartWrapper
                padding={{ top: 0, left: padding.left, right: padding.right, bottom: 30 }}
                height={100}
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
            </ChartWrapper>
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
