import React from "react";
import { VictoryScatter } from "victory";
import ISemanticDriftData from "../../../../models/ISemanticDriftData";
import ChartWrapper from "../../../../components/victoryCharts/ChartWrapper";

interface IProps {
    data: ISemanticDriftData;
}

export default function SemanticDriftChart(props: IProps) {
    const { data } = props;

    const yearPointColour = "#f28b27";
    const contextWordPointColour = "#a6c9e1";

    const primaryWordValue = data.primaryWord.value;

    const yearPoints = data.semanticDrift.yearPoints.map(point => {
        return {
            x: point.coord.x,
            y: point.coord.y,
            label: `${primaryWordValue} (${point.year})`,
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
