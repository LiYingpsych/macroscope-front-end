import React from "react";
import IFrequencyData from "../../../../models/IFrequencyData";
import LineChart from "../../../../components/victoryCharts/LineChart";

interface IProps {
    data: IFrequencyData;
}

export default function FrequencyChart(props: IProps) {
    const { data } = props;

    return (
        <LineChart
            type="dateTime"
            lines={[
                { coords: data.frequencyCoords.matchFullWord, legendLabel: "matchFullWord" },
                { coords: data.frequencyCoords.matchEnd, legendLabel: "matchEnd" },
                { coords: data.frequencyCoords.matchMiddle, legendLabel: "matchMiddle" },
                { coords: data.frequencyCoords.matchStart, legendLabel: "matchStart" }
            ]}
            dependentAxisProps={{ tickFormat: t => t.toExponential(), label: "Frequency" }}
            independentAxisProps={{ label: "Year" }}
        />
    );
}
