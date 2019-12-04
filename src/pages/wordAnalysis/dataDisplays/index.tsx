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

    return searchTerm.trim() === "" ? null : (
        <>
            {displayError() ? (
                <ErrorMessage
                    message="There is no data to display. Please change the settings to include at least one
                setting."
                />
            ) : null}

            {dataDisplays.map((display, i) => {
                return <DataDisplayContainer key={i} firstItem={i === 0} {...display} />;
            })}
        </>
    );
}
