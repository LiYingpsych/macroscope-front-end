import React from "react";
import ISentimentData from "../../../../models/ISentimentData";
import Lines from "../../../../components/victoryCharts/Lines";
import LineChartSelectionWrapper from "../../../../components/victoryCharts/LineChartSelectionWrapper";

interface IProps {
    data: ISentimentData;
}

export default function SentimentChart(props: IProps) {
    const { data } = props;

    return (
        <LineChartSelectionWrapper
            dependentAxisType="dateTime"
            lines={new Lines([{ coords: data.sentimentCoords, legendLabel: "Sentiment" }])}
            dependentAxisProps={{ label: "Frequency" }}
            independentAxisProps={{ label: "Year" }}
        />
    );
}
