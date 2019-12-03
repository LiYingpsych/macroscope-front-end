import React from "react";
import ChartWrapper from "../ChartWrapper";
import { VictoryAxis, VictoryBar } from "victory";

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

    const positiveColour = "#4681b4";
    const negativeColour = "#ef1501";

    return (
        <ChartWrapper horizontal>
            <VictoryAxis
                dependentAxis
                style={{
                    axis: { stroke: "none" },
                    tickLabels: { stroke: "none", fill: "transparent" }
                }}
            />
            {ChangeBar({ colour: negativeColour, data: decreasingData, orientation: "right" })}
            {ChangeBar({ colour: positiveColour, data: increasingData })}
        </ChartWrapper>
    );
}

interface IBarProps {
    colour: string;
    data: IChangeBarData[];
    orientation?: "top" | "bottom" | "left" | "right";
}

function ChangeBar(props: IBarProps) {
    const { colour, data, orientation = "left" } = props;

    return [
        <VictoryAxis
            tickValues={data.map(d => d.label)}
            style={{
                axis: { stroke: "none" }
            }}
            orientation={orientation}
        />,
        <VictoryBar
            data={data}
            x="label"
            y="length"
            style={{
                data: {
                    fill: colour
                }
            }}
        />
    ];
}
