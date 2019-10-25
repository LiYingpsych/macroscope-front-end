import React from "react";
import ISearchSettings from "../models/ISearchSettings";
import SynonymTable from "./SynonymTable";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import SynonymNetworkGraph from "./SynonymNetworkGraph";
import DataDisplayContainer, { IDataDisplayContainerProps } from "./DataDisplayContainer";
import IClosestRequestParameters from "../../../services/backendApi/models/requestParameters/IClosestRequestParameters";
import ClosestSearchMethod from "../../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import IClosestData from "../../../models/IClosestData";
import {
    fetchSynonymListData,
    fetchSynonymNetworkData,
    fetchContextNetworkData
} from "./dataFetchers";
import ISynonymNetworkData from "../../../models/ISynonymNetworkData";
import ISynonymNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/ISynonymNetworkRequestParameters";
import IContextNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/IContextNetworkRequestParameters";
import IContextNetworkData from "../../../models/IContextNetworkData";
import ContextNetworkMethod from "../../../services/backendApi/models/requestParameters/ContextNetworkMethod";
import ContextNetworkGraph from "./ContextNetworkGraph";

interface IDataDisplay<S, T> extends IDataDisplayContainerProps<S, T> {
    isDisplayed: boolean;
}

interface IProps {
    searchTerm: string;
    searchSettings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, searchSettings } = props;

    const synonymTableDataDisplay: IDataDisplay<IClosestRequestParameters, IClosestData> = {
        isDisplayed: searchSettings.synonymListSettingsPanel.isOpen,
        title: `Synonyms table`,
        params: {
            searchTerm: searchTerm,
            year: searchSettings.synonymListSettingsPanel.settings.year,
            numberOfClosestWords: searchSettings.synonymListSettingsPanel.settings.numberOfSynonyms,
            method: ClosestSearchMethod.SGNS
        },
        fetchDataFunction: fetchSynonymListData,
        render: (data: IClosestData) => (
            <SynonymTable
                searchTerm={searchTerm}
                settings={searchSettings.synonymListSettingsPanel.settings}
                data={data}
            />
        )
    };

    const synonymNetworkDataDisplay: IDataDisplay<
        ISynonymNetworkRequestParameters,
        ISynonymNetworkData
    > = {
        isDisplayed: searchSettings.synonymNetworkSettingsPanel.isOpen,
        title: `Synonyms network`,
        params: {
            searchTerm: searchTerm,
            year: searchSettings.synonymNetworkSettingsPanel.settings.year,
            synonymsPerTarget:
                searchSettings.synonymNetworkSettingsPanel.settings.synonymsPerTarget,
            similarityThreshold:
                searchSettings.synonymNetworkSettingsPanel.settings.similarityThreshold
        },
        fetchDataFunction: fetchSynonymNetworkData,
        render: (data: ISynonymNetworkData) => <SynonymNetworkGraph data={data} />
    };

    const contextNetworkDataDisplay: IDataDisplay<
        IContextNetworkRequestParameters,
        IContextNetworkData
    > = {
        isDisplayed: searchSettings.contextNetworkSettingsPanel.isOpen,
        title: `Context network`,
        params: {
            searchTerm: searchTerm,
            year: searchSettings.contextNetworkSettingsPanel.settings.year,
            maximumNodes: searchSettings.contextNetworkSettingsPanel.settings.maximumNodes,
            contextRelevance: searchSettings.contextNetworkSettingsPanel.settings.contextRelevance,
            contextCohesiveness:
                searchSettings.contextNetworkSettingsPanel.settings.contextCohesiveness,
            wordRelevance:
                searchSettings.contextNetworkSettingsPanel.settings.individualWordRelevance,
            minimumEdges: searchSettings.contextNetworkSettingsPanel.settings.minimumEdges,
            displayNodes: searchSettings.contextNetworkSettingsPanel.settings.displayNodes,
            method: ContextNetworkMethod.COR
        },
        fetchDataFunction: fetchContextNetworkData,
        render: (data: IContextNetworkData) => <ContextNetworkGraph data={data} />
    };

    const dataDisplays: IDataDisplay<any, any>[] = [
        synonymTableDataDisplay,
        synonymNetworkDataDisplay,
        contextNetworkDataDisplay
    ];

    let displayError = true;
    const displays = dataDisplays.map((display, i) => {
        const { isDisplayed, ...rest } = display;

        if (isDisplayed) {
            displayError = false;

            return <DataDisplayContainer key={i} {...rest} />;
        }

        return null;
    });

    return searchTerm.trim() === "" ? null : (
        <>
            {displayError ? (
                <ErrorMessage>
                    There is no data to display. Please change the settings to include at least one
                    setting.
                </ErrorMessage>
            ) : (
                displays
            )}
        </>
    );
}
