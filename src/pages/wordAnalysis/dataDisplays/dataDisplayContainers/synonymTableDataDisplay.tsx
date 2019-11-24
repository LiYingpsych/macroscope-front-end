import React from "react";
import ISettingPanel from "../../models/ISettingPanel";
import ISynonymListSettings from "../../models/ISynonymListSettings";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import IClosestRequestParameters from "../../../../services/backendApi/models/requestParameters/IClosestRequestParameters";
import IClosestData from "../../../../models/IClosestData";
import { mapSynonymListEnumToRequestParamEnum } from "../../../../services/backendApi/models/requestParameters/enums/ClosestSearchMethodRequestParameter";
import singleDataFetchers from "../singleDataFetchers";
import SynonymTable from "../dataComponents/SynonymTable";

export default function synonymTableDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<ISynonymListSettings>
): IDataDisplayContainerProps<IClosestRequestParameters, IClosestData> {
    const { isOpen, settings } = panel;

    return {
        isDisplayed: isOpen,
        title: `Synonym list`,
        params: {
            searchTerm: searchTerm,
            year: settings.year,
            numberOfClosestWords: settings.numberOfSynonyms,
            method: mapSynonymListEnumToRequestParamEnum(settings.method)
        },
        fetchDataFunction: singleDataFetchers.fetchSynonymListData,
        render: (data: IClosestData) => <SynonymTable settings={settings} data={data} />
    };
}
