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
                { coords: data.frequencyCoords.matchEnd },
                { coords: data.frequencyCoords.matchFullWord },
                { coords: data.frequencyCoords.matchMiddle },
                { coords: data.frequencyCoords.matchStart }
            ]}
            dependentAxisProps={{ tickFormat: t => t.toExponential() }}
        />
    );
}
