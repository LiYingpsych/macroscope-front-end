import React from "react";
import ISearchSettings from "../models/ISearchSettings";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import DataDisplayContainer, { IDataDisplayContainerProps } from "./DataDisplayContainer";
import synonymTableDataDisplay from "./dataDisplayContainers/synonymTableDataDisplay";
import synonymNetworkDataDisplay from "./dataDisplayContainers/synonymNetworkDataDisplay";
import contextNetworkDataDisplay from "./dataDisplayContainers/contextNetworkDataDisplay";
import semanticDriftDataDisplay from "./dataDisplayContainers/semanticDriftDataDisplay";
import contextChangeDataDisplay from "./dataDisplayContainers/contextChangeDataDisplay";
import sentimentDataDisplay from "./dataDisplayContainers/sentimentDataDisplay";
import frequencyDataDisplay from "./dataDisplayContainers/frequencyDataDisplay";
import Grid from "@material-ui/core/Grid";
import { layout } from "../../../globals";

interface IProps {
    searchTerm: string;
    searchSettings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, searchSettings } = props;

    const dataDisplays: IDataDisplayContainerProps<any, any>[] = [
        sentimentDataDisplay(searchTerm, searchSettings.sentimentSettingsPanel),
        frequencyDataDisplay(searchTerm, searchSettings.frequencySettingsPanel),
        synonymTableDataDisplay(searchTerm, searchSettings.synonymListSettingsPanel),
        synonymNetworkDataDisplay(searchTerm, searchSettings.synonymNetworkSettingsPanel),
        contextNetworkDataDisplay(searchTerm, searchSettings.contextNetworkSettingsPanel),
        semanticDriftDataDisplay(searchTerm, searchSettings.semanticDriftSettingsPanel),
        contextChangeDataDisplay(searchTerm, searchSettings.contextChangeSettingsPanel)
    ];

    const displayError = () => {
        for (let index = 0; index < dataDisplays.length; index++) {
            const { isDisplayed } = dataDisplays[index];

            if (isDisplayed) {
                return false;
            }
        }

        return true;
    };

    let displayComponents = [];
    let notFirstItem = false;
    for (let i = 0; i < dataDisplays.length; i++) {
        const display = dataDisplays[i];

        const component = (
            <DataDisplayContainer
                key={i}
                firstItem={display.isDisplayed && !notFirstItem}
                {...display}
            />
        );
        displayComponents.push(component);

        if (display.isDisplayed) notFirstItem = true;
    }

    return searchTerm.trim() === "" ? null : (
        <>
            {displayError() ? (
                <Grid container justify="center">
                    <Grid item style={{ width: "100%", maxWidth: layout.searchBarMaxWidth }}>
                        <ErrorMessage message="No analyses have been selected. Please change the settings to include at least one analysis type." />
                    </Grid>
                </Grid>
            ) : null}

            {displayComponents}
        </>
    );
}
