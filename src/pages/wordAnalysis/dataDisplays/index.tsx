import React, { ReactNode } from "react";
import ISearchSettings from "../models/ISearchSettings";
import SynonymTable from "./SynonymTable";
import ErrorMessage from "../../../components/errors/ErrorMessage";

interface IDataDisplay {
    component: ReactNode;
    isDisplayed: boolean;
}

interface IProps {
    searchTerm: string;
    settings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, settings } = props;

    const dataDisplays: IDataDisplay[] = [
        {
            component: (
                <SynonymTable
                    searchTerm={searchTerm}
                    settings={settings.synonymListSettingsPanel.settings}
                />
            ),
            isDisplayed: settings.synonymListSettingsPanel.isOpen
        }
    ];

    let displayError = true;
    const displays = dataDisplays.map(display => {
        if (display.isDisplayed) {
            displayError = false;
            return display.component;
        }

        return null;
    });

    return searchTerm.trim() === "" ? null : (
        <>
            {displays}

            {displayError ? (
                <ErrorMessage>
                    There is no data to display. Please change the settings to include at least one
                    setting.
                </ErrorMessage>
            ) : null}
        </>
    );
}
