import React from "react";
import ISentimentData from "models/ISentimentData";
import Lines from "components/victoryCharts/lineChart/Lines";
import LineChartSelectionWrapper from "components/victoryCharts/lineChart/LineChartSelectionWrapper";

interface IProps {
    data: ISentimentData;
}

export default function SentimentChart(props: IProps) {
    const { data } = props;

    return (
        <LineChartSelectionWrapper
            dependentAxisType="dateTime"
            lines={new Lines([{ coords: data.sentimentCoords, legendLabel: "Sentiment" }])}
            dependentAxisProps={{ label: "Sentiment" }}
            independentAxisProps={{ label: "Year" }}
        />
    );
}
