import React from "react";
import IContextNetworkSettings from "../../models/IContextNetworkSettings";
import ISettingPanel from "../../models/ISettingPanel";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import IContextNetworkRequestParameters from "services/backendApi/models/requestParameters/IContextNetworkRequestParameters";
import IContextNetworkData from "models/IContextNetworkData";
import { mapContextNetworkEnumToRequestParamEnum } from "services/backendApi/models/requestParameters/enums/ContextNetworkMethodRequestParameter";
import singleDataFetchers from "../singleDataFetchers";
import ContextNetworkGraph from "../dataComponents/ContextNetworkGraph";

export default function contextNetworkDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<IContextNetworkSettings>
): IDataDisplayContainerProps<IContextNetworkRequestParameters, IContextNetworkData> {
    const { isOpen, settings } = panel;
    return {
        isDisplayed: isOpen,
        title: `Context network`,
        params: {
            searchTerm: searchTerm,
            year: settings.year,
            maximumNodes: settings.maximumNodes,
            contextRelevance: settings.contextRelevance,
            contextCohesiveness: settings.contextCohesiveness,
            wordRelevance: settings.individualWordRelevance,
            minimumEdges: settings.minimumEdges,
            displayNodes: settings.displayNodes,
            method: mapContextNetworkEnumToRequestParamEnum(settings.method)
        },
        fetchDataFunction: singleDataFetchers.fetchContextNetworkData,
        render: (data: IContextNetworkData) => <ContextNetworkGraph data={data} />
    };
}
