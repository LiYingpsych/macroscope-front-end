import React, { useState } from "react";
import {
    VictoryCursorContainer,
    CursorData,
    VictoryCursorContainerProps,
    DomainPropType,
    VictoryLine,
    VictoryLabel,
    VictoryScatter
} from "victory";
import ICartesianCoordinate, { xCoordType, yCoordType } from "../models/ICartesianCoordinate";
import Lines from "../Lines";
import { useTheme } from "@material-ui/core/styles";
import { chartColours } from "../../../themes/colours";

interface IOptions<S extends xCoordType, T extends yCoordType> {
    lines: Lines<S, T>;
}

export default function useLineChartCursorIndicator<S extends xCoordType, T extends yCoordType>(
    options: IOptions<S, T>
) {
    const { lines } = options;
    const theme = useTheme();

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

    return {
        lineChartCursorIndicatorContainerComponent: (
            <VictoryCursorContainer
                onCursorChange={handleCursorChange}
                cursorComponent={<div style={{ display: "none" }}></div>}
            />
        ),
        lineChartCursorIndicatorLine:
            typeof cursorClosestXCoordinate === "undefined" ||
            cursorClosestXCoordinate === null ? null : (
                <VictoryLine
                    domain={getDomain()}
                    style={{
                        data: { stroke: theme.palette.grey[300], strokeWidth: 1 },
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
            ),
        lineChartCursorIndicatorIntersectionPoints:
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
                  }),
        lineChartCursorIndicatorYValueDisplay:
            typeof intersectionCoords === "undefined"
                ? undefined
                : intersectionCoords.map((coord, i) => {
                      return (
                          <div key={i} style={{ color: chartColours[i].main }}>
                              {coord.x}, {coord.y}
                          </div>
                      );
                  })
    };
}
