import React, { useState } from "react";
import ChartWrapper from "./ChartWrapper";
import {
    VictoryAxis,
    VictoryLine,
    DomainPropType,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryAxisProps
} from "victory";
import ICartesianCoordinate from "./models/ICartesianCoordinate";
import { chartColours } from "../../themes/colours";

interface ILine<S, T> {
    coords: ICartesianCoordinate<S, T>[];
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

    const independentAxisTickFormat =
        type === "dateTime"
            ? (x: any) => new Date(x, 0).getFullYear()
            : independentAxisProps.tickFormat;

    const [zoomDomain, setZoomDomain] = useState<DomainPropType>();

    const handleZoom = (domain: DomainPropType) => {
        setZoomDomain(domain);
    };

    const LinesComponent = lines.map((line, i) => (
        <VictoryLine
            style={{ data: { stroke: chartColours[i % chartColours.length].main } }}
            data={line.coords}
            key={i}
        />
    ));

    return (
        <>
            <ChartWrapper
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        onZoomDomainChange={handleZoom}
                    />
                }
            >
                <VictoryAxis dependentAxis {...dependentAxisProps} />
                <VictoryAxis {...independentAxisProps} tickFormat={independentAxisTickFormat} />

                {LinesComponent}
            </ChartWrapper>
            <ChartWrapper
                padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                height={100}
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={handleZoom}
                    />
                }
            >
                <VictoryAxis tickFormat={independentAxisTickFormat} />
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

// <VictoryLegend x={125} y={50}
// title="Legend"
// centerTitle
// orientation="horizontal"
// gutter={20}
// style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
// data={[
// { name: "One", symbol: { fill: "tomato", type: "star" } },
// { name: "Two", symbol: { fill: "orange" } },
// { name: "Three", symbol: { fill: "gold" } }
// ]}
// />
