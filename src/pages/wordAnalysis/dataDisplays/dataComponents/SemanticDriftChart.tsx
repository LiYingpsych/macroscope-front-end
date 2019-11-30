import React from "react";
import { useTheme } from "@material-ui/core/styles";
import ISemanticDriftData from "../../../../models/ISemanticDriftData";
import ScatterChart from "../../../../components/victoryCharts/scatterChart/ScatterChart";

interface IProps {
    data: ISemanticDriftData;
}

export default function SemanticDriftChart(props: IProps) {
    const { data } = props;

    const theme = useTheme();

    const yearPointColour = theme.palette.secondary.light;
    const contextWordPointColour = theme.palette.primary.light;

    const primaryWord = data.primaryWord;

    const yearPoints = data.semanticDrift.yearPoints.map(point => {
        return {
            x: point.coord.x,
            y: point.coord.y,
            label: `${primaryWord.value} (${point.year})`,
            fill: yearPointColour
        };
    });

    const contextWordPoints = data.semanticDrift.contextWordPoints.map(point => {
        return {
            x: point.coord.x,
            y: point.coord.y,
            label: `${point.word.value}`,
            fill: contextWordPointColour
        };
    });

    return <ScatterChart data={[...yearPoints, ...contextWordPoints]} />;
}
