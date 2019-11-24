import React from "react";
import ISettingPanel from "../../models/ISettingPanel";
import { IDataDisplayContainerProps } from "../DataDisplayContainer";
import singleDataFetchers from "../singleDataFetchers";
import ISemanticDriftSettings from "../../models/ISemanticDriftSettings";
import ISemanticDriftRequestParameters from "../../../../services/backendApi/models/requestParameters/ISemanticDriftRequestParameters";
import ISemanticDriftData from "../../../../models/ISemanticDriftData";
import { semanticDriftMinYear, semanticDriftMaxYear } from "../../../../globals";
import SemanticDriftChart from "../dataComponents/SemanticDriftChart";

export default function semanticDriftDataDisplay(
    searchTerm: string,
    panel: ISettingPanel<ISemanticDriftSettings>
): IDataDisplayContainerProps<ISemanticDriftRequestParameters, ISemanticDriftData> {
    const { isOpen } = panel;

    return {
        isDisplayed: isOpen,
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
}
