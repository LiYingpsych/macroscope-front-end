import React from "react";
import ChartWrapper from "../../../../components/victoryCharts/ChartWrapper";
import { VictoryLine, VictoryAxis } from "victory";
import IFrequencyData from "../../../../models/IFrequencyData";

interface IProps {
    data: IFrequencyData;
}

export default function FrequencyChart(props: IProps) {
    const { data } = props;

    return (
        <ChartWrapper>
            <VictoryAxis dependentAxis tickFormat={t => t.toExponential()} />
            <VictoryAxis tickFormat={t => `${t}`} tickValues={[1800, 1850, 1900, 1950, 2000]} />
            <VictoryLine data={data.frequencyCoords.matchEnd} />
            <VictoryLine data={data.frequencyCoords.matchFullWord} />
            <VictoryLine data={data.frequencyCoords.matchMiddle} />
            <VictoryLine data={data.frequencyCoords.matchStart} />
        </ChartWrapper>
    );
}
