import React from "react";
import { VictoryChart, VictoryScatter } from "victory";
import victoryThemes from "../../../../themes/victoryThemes";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ISemanticDriftData from "../../../../models/ISemanticDriftData";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .VictoryContainer": {
                maxWidth: "809px"
            }
        }
    })
);

interface IProps {
    data: ISemanticDriftData;
}

export default function SemanticDriftGraph(props: IProps) {
    const classes = useStyles();
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
        <div className={classes.root}>
            <VictoryChart height={500} width={809} theme={victoryThemes.defaultTheme}>
                <VictoryScatter
                    size={7}
                    data={[...yearPoints, ...contextWordPoints]}
                    style={{
                        data: {
                            fill: ({ datum }) => datum.fill
                        }
                    }}
                />
            </VictoryChart>
        </div>
    );
}
