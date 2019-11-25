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
        return {
            x: [getMinXValueInAllLines(lines), getMaxXValueInAllLines(lines)]
        } as DomainPropType;
    };

    const [zoomDomain, setZoomDomain] = useState<DomainPropType>(getDomain(lines));

    const handleZoom = (domain: DomainPropType) => {
        setZoomDomain(domain);
    };

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

                {lines.map(line => {
                    return <VictoryLine data={line.coords} />;
                })}
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

                {lines.map(line => {
                    return <VictoryLine data={line.coords} />;
                })}
            </ChartWrapper>
        </>
    );
}
