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

    const axisStyles = {
        axis: { stroke: "none" }
    };

    return (
        <ChartWrapper horizontal>
            <VictoryAxis
                dependentAxis
                style={{
                    axis: { stroke: "none" },
                    tickLabels: { stroke: "none", fill: "transparent" }
                }}
            />
            <VictoryAxis
                orientation="right"
                tickValues={decreasingData.map(d => d.label)}
                style={axisStyles}
            />

            <VictoryBar
                data={decreasingData}
                x="label"
                y="length"
                style={{
                    data: {
                        fill: negativeColour
                    }
                }}
            />
            <VictoryAxis tickValues={increasingData.map(d => d.label)} style={axisStyles} />
            <VictoryBar
                data={increasingData}
                x="label"
                y="length"
                style={{
                    data: {
                        fill: positiveColour
                    }
                }}
            />
        </ChartWrapper>
    );
}
