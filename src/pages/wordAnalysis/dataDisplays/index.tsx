import React, { ReactNode } from "react";
import ISearchSettings from "../models/ISearchSettings";
import SynonymTable from "./SynonymTable";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import SynonymNetworkGraph from "./SynonymNetworkGraph";
import Grid from "@material-ui/core/Grid";

interface IDataDisplay {
    render: (key: number) => ReactNode;
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
            render: (key: number) => (
                <SynonymTable
                    key={key}
                    searchTerm={searchTerm}
                    settings={settings.synonymListSettingsPanel.settings}
                />
            ),
            isDisplayed: settings.synonymListSettingsPanel.isOpen
        },
        {
            render: (key: number) => (
                <SynonymNetworkGraph
                    key={key}
                    searchTerm={searchTerm}
                    settings={settings.synonymNetworkSettingsPanel.settings}
                />
            ),
            isDisplayed: settings.synonymNetworkSettingsPanel.isOpen
        }
    ];

    let displayError = true;
    const displays = dataDisplays.map((display, i) => {
        if (display.isDisplayed) {
            displayError = false;
            return display.render(i);
        }

        return null;
    });

    return searchTerm.trim() === "" ? null : (
        <>
            <Grid container direction="column" spacing={2}>
                {displays.map((display, i) => {
                    return (
                        <Grid key={i} item>
                            {display}
                        </Grid>
                    );
                })}
            </Grid>

            {displayError ? (
                <ErrorMessage>
                    There is no data to display. Please change the settings to include at least one
                    setting.
                </ErrorMessage>
            ) : null}
        </>
    );
}
