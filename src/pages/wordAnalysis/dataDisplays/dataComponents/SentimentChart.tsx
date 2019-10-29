import React from "react";
import ISentimentData from "../../../../models/ISentimentData";
import ChartWrapper from "./victoryCharts/ChartWrapper";
import { VictoryLine, VictoryAxis } from "victory";

interface IProps {
    data: ISentimentData;
}

export default function SentimentChart(props: IProps) {
    const { data } = props;

    return (
        <ChartWrapper>
            <VictoryAxis dependentAxis />
            <VictoryAxis tickFormat={t => `${t}`} tickValues={[1800, 1850, 1900, 1950, 2000]} />
            <VictoryLine data={data.sentimentCoords} />
        </ChartWrapper>
    );
}
