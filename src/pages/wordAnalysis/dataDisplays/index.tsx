import React from "react";
import ISearchSettings from "../models/ISearchSettings";
import SynonymTable from "./dataComponents/SynonymTable";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import SynonymNetworkGraph from "./dataComponents/SynonymNetworkGraph";
import DataDisplayContainer, { IDataDisplayContainerProps } from "./DataDisplayContainer";
import IClosestRequestParameters from "../../../services/backendApi/models/requestParameters/IClosestRequestParameters";
import { mapSynonymListEnumToRequestParamEnum } from "../../../services/backendApi/models/requestParameters/enums/ClosestSearchMethodRequestParameter";
import IClosestData from "../../../models/IClosestData";
import singleDataFetchers from "./singleDataFetchers";
import ISynonymNetworkData from "../../../models/ISynonymNetworkData";
import ISynonymNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/ISynonymNetworkRequestParameters";
import IContextNetworkRequestParameters from "../../../services/backendApi/models/requestParameters/IContextNetworkRequestParameters";
import IContextNetworkData from "../../../models/IContextNetworkData";
import { mapContextNetworkEnumToRequestParamEnum } from "../../../services/backendApi/models/requestParameters/enums/ContextNetworkMethodRequestParameter";
import ContextNetworkGraph from "./dataComponents/ContextNetworkGraph";
import ISemanticDriftRequestParameters from "../../../services/backendApi/models/requestParameters/ISemanticDriftRequestParameters";
import ISemanticDriftData from "../../../models/ISemanticDriftData";
import { semanticDriftMinYear, semanticDriftMaxYear } from "../../../globals";
import SemanticDriftChart from "./dataComponents/SemanticDriftChart";
import IContextChangeRequestParameters from "../../../services/backendApi/models/requestParameters/IContextChangeRequestParameters";
import IContextChangeData from "../../../models/IContextChangeData";
import ContextChangeChart from "./dataComponents/ContextChangeChart";
import ISentimentRequestParameters from "../../../services/backendApi/models/requestParameters/ISentimentRequestParameters";
import ISentimentData from "../../../models/ISentimentData";
import SentimentChart from "./dataComponents/SentimentChart";
import { mapSentimentTypeEnumToRequestParamEnum } from "../../../services/backendApi/models/requestParameters/enums/SentimentPlotTypeRequestParameter";
import IFrequencyData from "../../../models/IFrequencyData";
import IFrequencyRequestParameters from "../../../services/backendApi/models/requestParameters/IFrequencyRequestParameters";
import FrequencyChart from "./dataComponents/FrequencyChart";

interface IProps {
    searchTerm: string;
    searchSettings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, searchSettings } = props;

    const synonymTableDataDisplay: IDataDisplayContainerProps<
        IClosestRequestParameters,
        IClosestData
    > = {
        isDisplayed: searchSettings.synonymListSettingsPanel.isOpen,
        title: `Synonym list`,
        params: {
            searchTerm: searchTerm,
            year: searchSettings.synonymListSettingsPanel.settings.year,
            numberOfClosestWords: searchSettings.synonymListSettingsPanel.settings.numberOfSynonyms,
            method: mapSynonymListEnumToRequestParamEnum(
                searchSettings.synonymListSettingsPanel.settings.method
            )
        },
        fetchDataFunction: singleDataFetchers.fetchSynonymListData,
        render: (data: IClosestData) => (
            <SynonymTable settings={searchSettings.synonymListSettingsPanel.settings} data={data} />
        )
    };

    const synonymNetworkDataDisplay: IDataDisplayContainerProps<
        ISynonymNetworkRequestParameters,
        ISynonymNetworkData
    > = {
        isDisplayed: searchSettings.synonymNetworkSettingsPanel.isOpen,
        title: `Synonym network`,
        params: {
            searchTerm: searchTerm,
            year: searchSettings.synonymNetworkSettingsPanel.settings.year,
            synonymsPerTarget:
                searchSettings.synonymNetworkSettingsPanel.settings.synonymsPerTarget,
            similarityThreshold:
                searchSettings.synonymNetworkSettingsPanel.settings.similarityThreshold
        },
        fetchDataFunction: singleDataFetchers.fetchSynonymNetworkData,
        render: (data: ISynonymNetworkData) => <SynonymNetworkGraph data={data} />
    };

    const contextNetworkDataDisplay: IDataDisplayContainerProps<
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
            method: mapContextNetworkEnumToRequestParamEnum(
                searchSettings.contextNetworkSettingsPanel.settings.method
            )
        },
        fetchDataFunction: singleDataFetchers.fetchContextNetworkData,
        render: (data: IContextNetworkData) => <ContextNetworkGraph data={data} />
    };

    const semanticDriftDataDisplay: IDataDisplayContainerProps<
        ISemanticDriftRequestParameters,
        ISemanticDriftData
    > = {
        isDisplayed: searchSettings.semanticDriftSettingsPanel.isOpen,
        title: `Semantic drift`,
        params: {
            searchTerm: searchTerm,
            startYear: semanticDriftMinYear,
            endYear: semanticDriftMaxYear,
            numberOfYearsInInterval: 5,
            numberOfClosestWords: 10
        },
        fetchDataFunction: singleDataFetchers.fetchSemanticDriftData,
        render: (data: ISemanticDriftData) => <SemanticDriftChart data={data} />
    };

    const contextChangeDataDisplay: IDataDisplayContainerProps<
        IContextChangeRequestParameters,
        IContextChangeData
    > = {
        isDisplayed: searchSettings.contextChangeSettingsPanel.isOpen,
        title: `Context change`,
        params: {
            searchTerm: searchTerm,
            startYear: searchSettings.contextChangeSettingsPanel.settings.startYear,
            endYear: searchSettings.contextChangeSettingsPanel.settings.endYear,
            numberOfContextWords:
                searchSettings.contextChangeSettingsPanel.settings.numberOfContextWords
        },
        fetchDataFunction: singleDataFetchers.fetchContextChangeData,
        render: (data: IContextChangeData) => <ContextChangeChart data={data} />
    };

    const sentimentDataDisplay: IDataDisplayContainerProps<
        ISentimentRequestParameters,
        ISentimentData
    > = {
        isDisplayed: searchSettings.sentimentSettingsPanel.isOpen,
        title: `Sentiment`,
        params: {
            searchTerm: searchTerm,
            plotType: mapSentimentTypeEnumToRequestParamEnum(
                searchSettings.sentimentSettingsPanel.settings.type
            )
        },
        fetchDataFunction: singleDataFetchers.fetchSentimentData,
        render: (data: ISentimentData) => <SentimentChart data={data} />
    };

    const frequencyDataDisplay: IDataDisplayContainerProps<
        IFrequencyRequestParameters,
        IFrequencyData
    > = {
        isDisplayed: searchSettings.frequencySettingsPanel.isOpen,
        title: `Frequency`,
        params: {
            searchTerm: searchTerm,
            // TODO: the following should be options and not be defaulted
            matchEnd: false,
            matchFullWord: true,
            matchMiddle: false,
            matchStart: false
        },
        fetchDataFunction: singleDataFetchers.fetchFrequencyData,
        render: (data: IFrequencyData) => <FrequencyChart data={data} />
    };

    const dataDisplays: IDataDisplayContainerProps<any, any>[] = [
        synonymTableDataDisplay,
        synonymNetworkDataDisplay,
        contextNetworkDataDisplay,
        semanticDriftDataDisplay,
        contextChangeDataDisplay,
        sentimentDataDisplay,
        frequencyDataDisplay
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
                return <DataDisplayContainer key={i} {...display} />;
            })}
        </>
    );
}
