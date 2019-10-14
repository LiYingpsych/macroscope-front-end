import React from "react";
import ISearchSettings from "../models/ISearchSettings";
import IdentifiedSynonyms from "./IdentifiedSynonyms";

interface IProps {
    searchTerm: string;
    settings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, settings } = props;

    return searchTerm.trim() === "" ? null : (
        <>
            <div>Data displays</div>
            {settings.synonymListSettingsPanel.isOpen ? (
                <IdentifiedSynonyms
                    searchTerm={searchTerm}
                    settings={settings.synonymListSettingsPanel.settings}
                ></IdentifiedSynonyms>
            ) : null}
        </>
    );
}
