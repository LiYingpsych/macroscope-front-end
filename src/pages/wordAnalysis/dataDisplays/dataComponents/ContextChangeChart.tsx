import React from "react";
import { VictoryBar, VictoryAxis } from "victory";
import IContextChangeData, { IContextChangeWord } from "../../../../models/IContextChangeData";
import ChartWrapper from "../../../../components/victoryCharts/ChartWrapper";

interface IProps {
    data: IContextChangeData;
}

export default function ContextChangeChart(props: IProps) {
    const { data } = props;

    const positiveColour = "#4681b4";
    const negativeColour = "#ef1501";

    const mapWordsToData = (
        contextChangeWords: IContextChangeWord[],
        absolute: boolean = false
    ) => {
        const normConst = Math.max(...contextChangeWords.map(word => Math.abs(word.dif)));

        return contextChangeWords.map(contextPoint => {
            return {
                x: contextPoint.word.value,
                y: (absolute ? Math.abs(contextPoint.dif) : contextPoint.dif) / normConst
            };
        });
    };
    const increasingData = mapWordsToData(data.increasingWords, true).reverse();
    const decreasingData = mapWordsToData(data.decreasingWords);

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
                tickValues={decreasingData.map(d => d.x)}
                style={axisStyles}
            />

            <VictoryBar
                data={decreasingData}
                style={{
                    data: {
                        fill: negativeColour
                    }
                }}
            />
            <VictoryAxis tickValues={increasingData.map(d => d.x)} style={axisStyles} />
            <VictoryBar
                data={increasingData}
                style={{
                    data: {
                        fill: positiveColour
                    }
                }}
            />
        </ChartWrapper>
    );
}
