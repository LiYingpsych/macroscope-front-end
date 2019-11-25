import React, { useState } from "react";
import ChartWrapper from "./ChartWrapper";
import {
    VictoryAxis,
    VictoryLine,
    VictoryBrushContainer,
    DomainPropType,
    VictoryZoomContainer
} from "victory";
import ICoord from "../../models/ICoord";

interface ILine {
    coords: ICoord[];
}

interface IProps {
    lines: ILine[];
}

export default function LineChart(props: IProps) {
    const { lines } = props;

    const [zoomDomain, setZoomDomain] = useState<DomainPropType>();

    const handleZoom = (domain: DomainPropType) => {
        setZoomDomain(domain);
    };

    const LinesComponent = lines.map(line => {
        return <VictoryLine data={line.coords} />;
    });

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
                <VictoryAxis dependentAxis />
                <VictoryAxis tickFormat={t => `${t}`} />

                {LinesComponent}
            </ChartWrapper>
            <ChartWrapper
                padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                height={100}
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={handleZoom}
                    />
                }
            >
                <VictoryAxis tickFormat={x => new Date(x).getFullYear()} />
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
//     size={8}
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
