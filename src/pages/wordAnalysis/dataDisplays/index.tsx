import React from "react";
import ISearchSettings from "../models/ISearchSettings";
import SynonymTable from "./SynonymTable";

interface IProps {
    searchTerm: string;
    settings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, settings } = props;

    return searchTerm.trim() === "" ? null : (
        <>
            {settings.synonymListSettingsPanel.isOpen ? (
                <SynonymTable
                    searchTerm={searchTerm}
                    settings={settings.synonymListSettingsPanel.settings}
                ></SynonymTable>
            ) : null}
        </>
    );
}
