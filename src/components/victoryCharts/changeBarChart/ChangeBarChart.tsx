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
}

export default function ChangeBarChart(props: IProps) {
    const { increasingData, decreasingData } = props;

    return (
        <ChartWrapper horizontal>
            <VictoryAxis
                dependentAxis
                style={{
                    axis: { stroke: "none" },
                    tickLabels: { stroke: "none", fill: "transparent" }
                }}
            />
            {ChangeBar({ data: decreasingData, type: "negative" })}
            {ChangeBar({ data: increasingData, type: "positive" })}
        </ChartWrapper>
    );
}

interface IBarProps {
    data: IChangeBarData[];
    type: "positive" | "negative";
}

function ChangeBar(props: IBarProps) {
    const { data, type = "" } = props;

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
