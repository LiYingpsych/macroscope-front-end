import React from "react";
import ChartWrapper from "../ChartWrapper";
import { VictoryAxis, VictoryBar } from "victory";
import { useTheme } from "@material-ui/core/styles";
import { SortingOrder, stableSort, getSortingCompareFunction } from "../../../utils/sorting";

interface IChangeBarData {
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

    // TODO: Should only count bars with unique labels
    const totalNumberOfBars = increasingData.length + decreasingData.length;

    const padding = 10;
    const topBottomPadding = barWidth / 2 + padding;

    return (
        <ChartWrapper
            horizontal
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

    const orientation = type === "positive" ? "right" : "left";
    const colour =
        type === "positive" ? theme.palette.primary.light : theme.palette.secondary.light;

    const maxLength = Math.max(...data.map(d => Math.abs(d.length)));

    const parsedData = data.map(d => {
        return {
            x: d.label,
            y:
                maxLength === 0
                    ? 0
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
