import React, { useState } from "react";

import SearchbarWithSettings from "./SearchbarWithSettings";
import ISearchSettings from "./searchSettings/models/ISearchSettings";
import {
    closestMaxYear,
    synonymNetworkMaxYear,
    contextNetworkMaxYear,
    contextChangeMinYear,
    contextChangeMaxYear
} from "../../globals";
import { SentimentTypes } from "./searchSettings/settings/SentimentSettings";
import DataDisplays from "./dataDisplays";

export default function WordAnalysisPage() {
    const defaultSearchTerm: string = "";
    const defaultSettings: ISearchSettings = {
        synonymListSettingsPanel: {
            isOpen: false,
            settings: {
                year: closestMaxYear,
                numberOfSynonyms: 5
            }
        },
        synonymNetworkSettingsPanel: {
            isOpen: false,
            settings: {
                year: synonymNetworkMaxYear,
                synonymsPerTarget: 5,
                simalarityThreshold: 0.7
            }
        },
        contextNetworkSettingsPanel: {
            isOpen: false,
            settings: {
                year: contextNetworkMaxYear,
                maximumNodes: 200,
                contextRelevance: 0.55,
                contextCohesiveness: 0.55,
                individualWordRelevance: 3,
                minimumEdges: 5,
                displayNodes: 110
            }
        },
        semanticDriftSettingsPanel: {
            isOpen: false,
            settings: {}
        },
        contextChangeSettingsPanel: {
            isOpen: false,
            settings: {
                startYear: contextChangeMinYear,
                endYear: contextChangeMaxYear
            }
        },
        sentimentSettingsPanel: {
            isOpen: false,
            settings: {
                type: SentimentTypes.VALENCE
            }
        },
        frequencySettingsPanel: {
            isOpen: false,
            settings: {}
        }
    };

    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
    const [settings, setSettings] = useState(defaultSettings);

    return (
        <>
            <SearchbarWithSettings
                defaultSearchTerm={defaultSearchTerm}
                defaultSettings={defaultSettings}
                onSearch={(updatedSearchTerm: string, updatedSettings: ISearchSettings) => {
                    setSearchTerm(updatedSearchTerm);
                    setSettings(updatedSettings);
                }}
            />
            <DataDisplays searchTerm={searchTerm} settings={settings}></DataDisplays>
        </>
    );
}
