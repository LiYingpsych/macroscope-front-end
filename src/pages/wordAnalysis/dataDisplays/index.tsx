import React from "react";
import ISearchSettings from "../models/ISearchSettings";
import SynonymTable from "./SynonymTable";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import SynonymNetworkGraph from "./SynonymNetworkGraph";
import DataDisplayContainer, { IDataDisplayContainerProps } from "./DataDisplayContainer";
import IClosestRequestParameters from "../../../services/backendApi/models/requestParameters/IClosestRequestParameters";
import ClosestSearchMethod from "../../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import IClosestData from "../../../models/IClosestData";
import { fetchClosestData } from "./dataFetchers";

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
        fetchDataFunction: fetchClosestData,
        render: (data: IClosestData) => (
            <SynonymTable
                searchTerm={searchTerm}
                settings={searchSettings.synonymListSettingsPanel.settings}
                data={data}
            />
        )
    };

    const dataDisplays: IDataDisplay<any, any>[] = [
        synonymTableDataDisplay
        // {
        //     title: `Synonym network graph`,
        //     render: (key: number) => (
        //         <SynonymNetworkGraph
        //             key={key}
        //             searchTerm={searchTerm}
        //             settings={settings.synonymNetworkSettingsPanel.settings}
        //         />
        //     ),
        //     isDisplayed: settings.synonymNetworkSettingsPanel.isOpen
        // }
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
