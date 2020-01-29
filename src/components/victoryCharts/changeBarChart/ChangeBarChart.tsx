import React, { useRef } from "react";
import ChartWrapper from "../ChartWrapper";
import { VictoryAxis, VictoryBar } from "victory";
import { useTheme } from "@material-ui/core/styles";
import { SortingOrder, stableSort, getSortingCompareFunction } from "utils/sorting";
import numberOfUniqueItemsByProperty from "utils/numberOfUniqueItemsByProperty";
import useResponsiveChart from "../commonHooks/useResponsiveChart";

export interface IChangeBarData {
    label: string;
    length: number;
}

interface IProps {
    increasingData: IChangeBarData[];
    decreasingData: IChangeBarData[];
    increasingOrder?: SortingOrder;
    decreasingOrder?: SortingOrder;
    barWidth?: number;
    spacing?: number;
}

export default function ChangeBarChart(props: IProps) {
    const {
        increasingData,
        decreasingData,
        barWidth = 25,
        spacing = 10,
        increasingOrder = "asc",
        decreasingOrder = "asc"
    } = props;

    const totalNumberOfBars =
        numberOfUniqueItemsByProperty(increasingData, "label") +
        numberOfUniqueItemsByProperty(decreasingData, "label");

    const padding = 10;
    const topBottomPadding = barWidth / 2 + padding;

    const rootElement = useRef(null);
    const { responsiveWidth } = useResponsiveChart({
        rootElement
    });

    return (
        <div ref={rootElement}>
            <ChartWrapper
                horizontal
                width={responsiveWidth}
                height={totalNumberOfBars * (barWidth + spacing)}
                padding={{
                    left: padding,
                    right: padding,
                    top: topBottomPadding,
                    bottom: topBottomPadding
                }}
            >
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: { stroke: "none" },
                        tickLabels: { stroke: "none", fill: "transparent" }
                    }}
                />
                {ChangeBar({
                    id: "decreasingData",
                    barWidth,
                    data: decreasingData,
                    type: "negative",
                    order: decreasingOrder
                })}
                {ChangeBar({
                    id: "increasingData",
                    barWidth,
                    data: increasingData,
                    type: "positive",
                    order: increasingOrder
                })}
            </ChartWrapper>
        </div>
    );
}

interface IChangeBarProps {
    id: string;
    data: IChangeBarData[];
    type: "positive" | "negative";
    barWidth: number;
    order: SortingOrder;
}

function ChangeBar(props: IChangeBarProps) {
    const { id, data, type, barWidth, order } = props;

    const theme = useTheme();

    const orientation = type === "positive" ? "left" : "right";
    const colour =
        type === "positive" ? theme.palette.primary.light : theme.palette.secondary.light;

    const maxLength = Math.max(...data.map(d => Math.abs(d.length)));

    const parsedData = data.map(d => {
        return {
            x: d.label,
            y:
                maxLength === 0
                    ? type === "positive"
                        ? 1
                        : -1
                    : ((type === "positive" ? 1 : -1) * Math.abs(d.length)) / maxLength
        };
    });

    const sortedData = stableSort(parsedData, getSortingCompareFunction(order, "y"));

    return [
        <VictoryAxis
            key={`${id}-axis`}
            style={{
                axis: { stroke: "none" }
            }}
            orientation={orientation}
            tickFormat={(t: string) => {
                const labelInDataSet = parsedData.map(datum => datum.x).includes(t);

                return labelInDataSet ? t : "";
            }}
        />,
        <VictoryBar
            key={`${id}-bar`}
            barWidth={barWidth}
            data={sortedData}
            style={{
                data: {
                    fill: colour
                }
            }}
        />
    ];
}
