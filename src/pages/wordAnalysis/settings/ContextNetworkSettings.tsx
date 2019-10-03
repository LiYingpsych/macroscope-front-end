import React from "react";

import Grid from "@material-ui/core/Grid";
import NumberSelectionInput from "../../../components/inputs/NumberSelectionInput";

import range from "../../../utils/range";

export default function ContextNetworkSettings() {
    const contextNetworkMinYear = 1800;
    const contextNetworkMaxYear = 2000;

    const years: number[] = range(contextNetworkMinYear, contextNetworkMaxYear, 10);
    const yearDefault = years[years.length - 1];

    const maximumNodes: number[] = range(10, 400, 10);
    const maximumNodesDefault: number = 200;

    const contextRelevance: number[] = range(10, 100, 5).map((value: number) => {
        return value / 100;
    });
    const contextRelevanceDefault: number = 0.55;

    const contextCohesiveness: number[] = range(10, 100, 5).map((value: number) => {
        return value / 100;
    });
    const contextCohesivenessDefault: number = 0.55;

    const individualWordRelevance: number[] = range(20, 40).map((value: number) => {
        return value / 10;
    });
    const individualWordRelevanceDefault: number = 3;

    const minimumEdges: number[] = range(4, 6);
    const minimumEdgesDefault: number = 5;

    const displayNodes: number[] = range(20, 200, 5);
    const displayNodesDefault: number = 110;

    return (
        <form autoComplete="off">
            <Grid container direction="column">
                <Grid container item>
                    <NumberSelectionInput
                        label="Year"
                        numbers={years}
                        defaultNumber={yearDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Maximum nodes"
                        numbers={maximumNodes}
                        defaultNumber={maximumNodesDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Context relevance"
                        numbers={contextRelevance}
                        defaultNumber={contextRelevanceDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Context cohesiveness"
                        numbers={contextCohesiveness}
                        defaultNumber={contextCohesivenessDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Individual word relevance"
                        numbers={individualWordRelevance}
                        defaultNumber={individualWordRelevanceDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Minimum edges"
                        numbers={minimumEdges}
                        defaultNumber={minimumEdgesDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                    <NumberSelectionInput
                        label="Display nodes"
                        numbers={displayNodes}
                        defaultNumber={displayNodesDefault}
                        onChange={(selectedValue: number) => {
                            console.log(selectedValue);
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
