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

    // https://stackoverflow.com/questions/8864430/compare-javascript-array-of-objects-to-get-min-max
    // TODO: Extract the following getMinMax functions into coord class? It should at least be extracted
    const getMinXValue = (coords: ICoord[]) => {
        return coords.reduce(function(prev, curr) {
            return prev.x < curr.x ? prev : curr;
        });
    };

    const getMaxXValue = (coords: ICoord[]) => {
        return coords.reduce(function(prev, curr) {
            return prev.x > curr.x ? prev : curr;
        });
    };

    const getMinXValueInAllLines = (lines: ILine[]) => {
        let min = getMinXValue(lines[0].coords).x;

        for (let index = 1; index < lines.length; index++) {
            const line = lines[index];

            const minX = getMinXValue(line.coords).x;

            if (minX < min) min = minX;
        }

        return min;
    };

    const getMaxXValueInAllLines = (lines: ILine[]) => {
        let max = getMaxXValue(lines[0].coords).x;

        for (let index = 1; index < lines.length; index++) {
            const line = lines[index];

            const maxX = getMaxXValue(line.coords).x;

            if (maxX > max) max = maxX;
        }

        return max;
    };

    const getDomain = (lines: ILine[]): DomainPropType => {
        let linesToParse = [];

        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];

            if (line.coords.length !== 0) linesToParse.push(line);
        }

        return {
            x: [getMinXValueInAllLines(linesToParse), getMaxXValueInAllLines(linesToParse)]
        } as DomainPropType;
    };

    const [zoomDomain, setZoomDomain] = useState<DomainPropType>(getDomain(lines));

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
