import React from "react";
import ISettingPanel from "../../models/ISettingPanel";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import singleDataFetchers from "../singleDataFetchers";
import IFrequencySettings from "../../models/IFrequencySettings";
import IFrequencyRequestParameters from "../../../../services/backendApi/models/requestParameters/IFrequencyRequestParameters";
import IFrequencyData from "../../../../models/IFrequencyData";
import FrequencyChart from "../dataComponents/FrequencyChart";

export default function frequencyDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<IFrequencySettings>
): IDataDisplayContainerProps<IFrequencyRequestParameters, IFrequencyData> {
    const { isOpen } = panel;

    return {
        isDisplayed: isOpen,
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
}
