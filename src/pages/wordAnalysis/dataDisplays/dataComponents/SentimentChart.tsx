import React from "react";
import ISentimentData from "../../../../models/ISentimentData";
import LineChart from "../../../../components/victoryCharts/LineChart";

interface IProps {
    data: ISentimentData;
}

export default function SentimentChart(props: IProps) {
    const { data } = props;

    return <LineChart type="dateTime" lines={[{ coords: data.sentimentCoords }]} />;
}
