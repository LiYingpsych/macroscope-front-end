import React from "react";
import ISettingPanel from "../../models/ISettingPanel";
import IContextChangeSettings from "../../models/IContextChangeSettings";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import IContextChangeRequestParameters from "../../../../services/backendApi/models/requestParameters/IContextChangeRequestParameters";
import IContextChangeData from "../../../../models/IContextChangeData";
import singleDataFetchers from "../singleDataFetchers";
import ContextChangeChart from "../dataComponents/ContextChangeChart";

export default function contextChangeDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<IContextChangeSettings>
): IDataDisplayContainerProps<IContextChangeRequestParameters, IContextChangeData> {
    const { isOpen, settings } = panel;

    return {
        isDisplayed: isOpen,
        title: `Context change`,
        params: {
            searchTerm: searchTerm,
            startYear: settings.startYear,
            endYear: settings.endYear,
            numberOfContextWords: settings.numberOfContextWords
        },
        fetchDataFunction: singleDataFetchers.fetchContextChangeData,
        render: (data: IContextChangeData) => <ContextChangeChart data={data} />
    };
}
