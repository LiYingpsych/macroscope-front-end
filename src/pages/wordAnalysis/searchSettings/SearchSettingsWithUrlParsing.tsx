import React from "react";
import useReactRouter from "use-react-router";

import SearchSettings from "./SearchSettings";
import { encodeQueryStringObject } from "../../../utils/queryStringUtils";
import { getObjectFromQueryString } from "../getObjectFromQueryString";
import ISearchSettings from "../models/ISearchSettings";

interface IProps {
    defaultSettings: ISearchSettings;
    onUpdate: (updatedSettings: ISearchSettings) => void;
}

export default function SearchSettingsWithUrlParsing(props: IProps) {
    const { location, history } = useReactRouter();
    const { defaultSettings, onUpdate = (updatedSettings: ISearchSettings) => {} } = props;

    const pushSettingsToHistory = (settings: ISearchSettings) => {
        history.push(`?${encodeQueryStringObject(settings)}`);
    };

    let currentSettings: ISearchSettings = JSON.parse(JSON.stringify(defaultSettings));
    try {
        currentSettings = getObjectFromQueryString(location.search, defaultSettings);
    } catch (error) {
        pushSettingsToHistory(currentSettings);
    }

    return (
        <SearchSettings
            defaultSettings={currentSettings}
            onUpdate={(updatedSettings: ISearchSettings) => {
                pushSettingsToHistory(updatedSettings);
                onUpdate(updatedSettings);
            }}
        />
    );
}
