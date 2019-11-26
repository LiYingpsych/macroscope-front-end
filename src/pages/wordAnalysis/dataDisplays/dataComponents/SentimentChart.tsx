import React from "react";
import ISentimentData from "../../../../models/ISentimentData";
import LineChart from "../../../../components/victoryCharts/LineChart";
import Lines from "../../../../components/victoryCharts/Lines";

interface IProps {
    data: ISentimentData;
}

export default function SentimentChart(props: IProps) {
    const { data } = props;

    return (
        <LineChart
            type="dateTime"
            lines={new Lines([{ coords: data.sentimentCoords, legendLabel: "Sentiment" }])}
            dependentAxisProps={{ label: "Frequency" }}
            independentAxisProps={{ label: "Year" }}
        />
    );
}
