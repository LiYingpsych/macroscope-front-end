import React from "react";
import ISettingPanel from "../../models/ISettingPanel";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import singleDataFetchers from "../singleDataFetchers";
import ISentimentSettings from "../../models/ISentimentSettings";
import ISentimentRequestParameters from "../../../../services/backendApi/models/requestParameters/ISentimentRequestParameters";
import ISentimentData from "../../../../models/ISentimentData";
import { mapSentimentTypeEnumToRequestParamEnum } from "../../../../services/backendApi/models/requestParameters/enums/SentimentPlotTypeRequestParameter";
import SentimentChart from "../dataComponents/SentimentChart";

export default function sentimentDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<ISentimentSettings>
): IDataDisplayContainerProps<ISentimentRequestParameters, ISentimentData> {
    const { isOpen, settings } = panel;

    return {
        isDisplayed: isOpen,
        title: `Sentiment`,
        params: {
            searchTerm: searchTerm,
            plotType: mapSentimentTypeEnumToRequestParamEnum(settings.type)
        },
        fetchDataFunction: singleDataFetchers.fetchSentimentData,
        render: (data: ISentimentData) => <SentimentChart data={data} />
    };
}
