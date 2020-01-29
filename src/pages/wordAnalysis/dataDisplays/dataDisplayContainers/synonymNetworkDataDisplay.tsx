import React from "react";
import ISynonymNetworkSettings from "../../models/ISynonymNetworkSettings";
import ISettingPanel from "../../models/ISettingPanel";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import ISynonymNetworkRequestParameters from "services/backendApi/models/requestParameters/ISynonymNetworkRequestParameters";
import ISynonymNetworkData from "models/ISynonymNetworkData";
import singleDataFetchers from "../singleDataFetchers";
import SynonymNetworkGraph from "../dataComponents/SynonymNetworkGraph";

export default function synonymNetworkDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<ISynonymNetworkSettings>
): IDataDisplayContainerProps<ISynonymNetworkRequestParameters, ISynonymNetworkData> {
    const { isOpen, settings } = panel;

    return {
        isDisplayed: isOpen,
        title: `Synonym network`,
        params: {
            searchTerm: searchTerm,
            year: settings.year,
            synonymsPerTarget: settings.synonymsPerTarget,
            similarityThreshold: settings.similarityThreshold
        },
        fetchDataFunction: singleDataFetchers.fetchSynonymNetworkData,
        render: (data: ISynonymNetworkData) => <SynonymNetworkGraph data={data} />
    };
}
