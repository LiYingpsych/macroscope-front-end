import React, { useEffect, useState } from "react";
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

    const [currentSettings, setCurrentSettings] = useState(
        JSON.parse(JSON.stringify(defaultSettings))
    );
    useEffect(() => {
        try {
            const parsedSettings = getObjectFromQueryString(location.search, defaultSettings);
            setCurrentSettings(parsedSettings);
            onUpdate(parsedSettings);
        } catch (error) {
            pushSettingsToHistory(defaultSettings);
        }
    }, []);

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
