import React from "react";
import ChartWrapper from "../ChartWrapper";
import { VictoryAxis, VictoryBar } from "victory";
import { useTheme } from "@material-ui/core/styles";

interface IChangeBarData {
    label: string;
    length: number;
}

interface IProps {
    increasingData: IChangeBarData[];
    decreasingData: IChangeBarData[];
    barWidth?: number;
    spacing?: number;
}

export default function ChangeBarChart(props: IProps) {
    const { increasingData, decreasingData, barWidth = 25, spacing = 10 } = props;

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
            {ChangeBar({ barWidth, data: decreasingData, type: "negative" })}
            {ChangeBar({ barWidth, data: increasingData, type: "positive" })}
        </ChartWrapper>
    );
}

interface IBarProps {
    data: IChangeBarData[];
    type: "positive" | "negative";
    barWidth: number;
}

function ChangeBar(props: IBarProps) {
    const { data, type, barWidth } = props;

    const theme = useTheme();

    const orientation = type === "positive" ? "right" : "left";
    const colour =
        type === "positive" ? theme.palette.primary.light : theme.palette.secondary.light;

    const tickValues = data.map(d => d.label);

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

    return [
        <VictoryAxis
            key="axis"
            tickValues={tickValues}
            style={{
                axis: { stroke: "none" }
            }}
            orientation={orientation}
        />,
        <VictoryBar
            barWidth={barWidth}
            key="bar"
            data={parsedData}
            style={{
                data: {
                    fill: colour
                }
            }}
        />
    ];
}
