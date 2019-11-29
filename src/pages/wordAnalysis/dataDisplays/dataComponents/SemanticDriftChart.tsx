import React from "react";
import { VictoryScatter } from "victory";
import ISemanticDriftData from "../../../../models/ISemanticDriftData";
import ChartWrapper from "../../../../components/victoryCharts/ChartWrapper";
import { useTheme } from "@material-ui/core/styles";

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

    return (
        <ChartWrapper>
            <VictoryScatter
                size={7}
                data={[...yearPoints, ...contextWordPoints]}
                style={{
                    data: {
                        fill: ({ datum }) => datum.fill
                    }
                }}
            />
        </ChartWrapper>
    );
}
