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
import Lines from "../Lines";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ICartesianCoordinate, { xCoordType, yCoordType } from "../../models/ICartesianCoordinate";
import chartColours from "../../../../themes/colours/chartColours";

interface IOptions<S extends xCoordType, T extends yCoordType> {
    lines: Lines<S, T>;
    dependentAxisName?: string;
}

export default function useLineChartCursorIndicator<S extends xCoordType, T extends yCoordType>(
    options: IOptions<S, T>
) {
    const { lines, dependentAxisName = "Y axis" } = options;
    const theme = useTheme();

    const [cursorClosestXCoordinate, setCursorClosestXCoordinate] = useState<S | null>();
    // const [intersectionCoords, setIntersectionCoords] = useState<ICartesianCoordinate<S, T>[]>();

    // TODO: submit issue - value returned depends on cursorDimension value when it should still return a CursorData prop
    const handleCursorChange = (value: CursorData, props: VictoryCursorContainerProps) => {
        console.log("value");
        console.log(value);
        if (typeof value === "undefined" || value === null) setCursorClosestXCoordinate(null);
        // else {
        // const _closestX = lines.getClosestXCoordinate(value.x as S);
        // setCursorClosestXCoordinate(_closestX);
        //     // updateIntersectionCoordinates(_closestX);
        // }
    };

    // const updateIntersectionCoordinates = (x: S) => {
    //     const _intersectionCoords = lines.getYIntersectionCoordinates(x);
    //     setIntersectionCoords(_intersectionCoords);
    // };

    const getDomain = (): DomainPropType => {
        return {
            x: [lines.domain.xMin as number, lines.domain.xMax as number],
            y: [lines.domain.yMin as number, lines.domain.yMax as number]
        };
    };

    return {
        handleCursorChange: handleCursorChange,
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
            )
        // lineChartCursorIndicatorIntersectionPoints:
        //     typeof cursorClosestXCoordinate === "undefined" ||
        //     cursorClosestXCoordinate === null ||
        //     typeof intersectionCoords === "undefined"
        //         ? null
        //         : intersectionCoords.map((coord, i) => {
        //               return (
        //                   <VictoryScatter
        //                       key={i}
        //                       size={4}
        //                       style={{ data: { fill: chartColours[i].intersectionDot } }}
        //                       data={[coord]}
        //                   />
        //               );
        //           }),
        // lineChartCursorIndicatorYValueDisplay:
        //     typeof intersectionCoords === "undefined" ? (
        //         undefined
        //     ) : (
        //         <div style={{ display: "flex", flexDirection: "column" }}>
        //             <Typography variant="h6" align="right">
        //                 {dependentAxisName} {intersectionCoords.length > 1 ? "values" : "value"}
        //             </Typography>
        //             <OrderedYValues order="desc" coords={intersectionCoords} />
        //         </div>
        //     )
    };
}

type orderType = "asc" | "desc";

interface IProps<S extends xCoordType, T extends yCoordType> {
    coords: ICartesianCoordinate<S, T>[];
    order?: orderType;
}

interface ICoordWithColour<S extends xCoordType, T extends yCoordType> {
    coord: ICartesianCoordinate<S, T>;
    colour: string;
}

function OrderedYValues<S extends xCoordType, T extends yCoordType>(props: IProps<S, T>) {
    const { coords, order = "asc" } = props;

    const coordsWithColour: ICoordWithColour<S, T>[] = coords.map((coord, i) => {
        return {
            coord: coord,
            colour: chartColours[i].main
        };
    });

    const sorted = coordsWithColour.sort((a, b) =>
        order === "asc" ? a.coord.y - b.coord.y : b.coord.y - a.coord.y
    );

    return (
        <>
            {sorted.map((item, i) => {
                return (
                    <Typography
                        variant="body1"
                        align="right"
                        key={i}
                        style={{ color: item.colour }}
                    >
                        {item.coord.y}
                    </Typography>
                );
            })}
        </>
    );
}
