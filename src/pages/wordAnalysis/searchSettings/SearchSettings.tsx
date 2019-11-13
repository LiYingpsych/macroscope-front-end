import React, { useState } from "react";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import SwitchExpansionPanel from "../../../components/SwitchExpansionPanel";
import ValidationErrorMessage from "../../../components/errors/ValidationErrorMessage";

import SynonymListSettings from "./settings/SynonymListSettings";
import SynonymNetworkSettings from "./settings/SynonymNetworkSettings";
import ContextNetworkSettings from "./settings/ContextNetworkSettings";
import ContextChangeSettings from "./settings/ContextChangeSettings";
import SentimentSettings from "./settings/SentimentSettings";

import ISearchSettings from "../models/ISearchSettings";
import ISynonymListSettings from "../models/ISynonymListSettings";
import ISynonymNetworkSettings from "../models/ISynonymNetworkSettings";
import IContextNetworkSettings from "../models/IContextNetworkSettings";
import IContextChangeSettings from "../models/IContextChangeSettings";
import ISentimentSettings from "../models/ISentimentSettings";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginRight: "1px",
            display: "flex",
            flexDirection: "column"
        }
    })
);

interface IProps {
    defaultSettings: ISearchSettings;
    onChange: (updatedSettings: ISearchSettings) => void;
}

export default function SearchSettings(props: IProps) {
    const classes = useStyles();
    const { defaultSettings, onChange } = props;

    const [synonymListError, setSynonymListError] = useState(false);
    const [synonymNetworkError, setSynonymNetworkError] = useState(false);
    const [contextNetworkError, setContextNetworkError] = useState(false);
    const [contextChangeError, setContextChangeError] = useState(false);
    const [sentimentError, setSentimentError] = useState(false);

    // TODO: consider having a global year
    return (
        <div className={classes.root}>
            <SwitchExpansionPanel
                label="Synonym list"
                isOpenDefault={defaultSettings.synonymListSettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        synonymListSettingsPanel: {
                            ...defaultSettings.synonymListSettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
                error={synonymListError}
            >
                <SynonymListSettings
                    defaultSettings={defaultSettings.synonymListSettingsPanel.settings}
                    onInvalidSettings={() => {
                        setSynonymListError(true);
                    }}
                    onChange={(settings: ISynonymListSettings) => {
                        setSynonymListError(false);
                        onChange({
                            ...defaultSettings,
                            synonymListSettingsPanel: {
                                ...defaultSettings.synonymListSettingsPanel,
                                settings: settings
                            }
                        });
                    }}
                />
            </SwitchExpansionPanel>

            <SwitchExpansionPanel
                label="Synonym network"
                isOpenDefault={defaultSettings.synonymNetworkSettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        synonymNetworkSettingsPanel: {
                            ...defaultSettings.synonymNetworkSettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
                error={synonymNetworkError}
            >
                <SynonymNetworkSettings
                    defaultSettings={defaultSettings.synonymNetworkSettingsPanel.settings}
                    onInvalidSettings={() => {
                        setSynonymNetworkError(true);
                    }}
                    onChange={(settings: ISynonymNetworkSettings) => {
                        setSynonymNetworkError(false);

                        onChange({
                            ...defaultSettings,
                            synonymNetworkSettingsPanel: {
                                ...defaultSettings.synonymNetworkSettingsPanel,
                                settings: settings
                            }
                        });
                    }}
                />
            </SwitchExpansionPanel>

            <SwitchExpansionPanel
                label="Context network"
                isOpenDefault={defaultSettings.contextNetworkSettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        contextNetworkSettingsPanel: {
                            ...defaultSettings.contextNetworkSettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
                error={contextNetworkError}
            >
                <ContextNetworkSettings
                    defaultSettings={defaultSettings.contextNetworkSettingsPanel.settings}
                    onInvalidSettings={() => {
                        setContextNetworkError(true);
                    }}
                    onChange={(settings: IContextNetworkSettings) => {
                        setContextNetworkError(false);

                        onChange({
                            ...defaultSettings,
                            contextNetworkSettingsPanel: {
                                ...defaultSettings.contextNetworkSettingsPanel,
                                settings: settings
                            }
                        });
                    }}
                />
            </SwitchExpansionPanel>

            <SwitchExpansionPanel
                label="Semantic drift"
                isOpenDefault={defaultSettings.semanticDriftSettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        semanticDriftSettingsPanel: {
                            ...defaultSettings.semanticDriftSettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
            ></SwitchExpansionPanel>

            <SwitchExpansionPanel
                label="Context change"
                isOpenDefault={defaultSettings.contextChangeSettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        contextChangeSettingsPanel: {
                            ...defaultSettings.contextChangeSettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
                error={contextChangeError}
            >
                <ContextChangeSettings
                    defaultSettings={defaultSettings.contextChangeSettingsPanel.settings}
                    onInvalidSettings={() => {
                        setContextChangeError(true);
                    }}
                    onChange={(settings: IContextChangeSettings) => {
                        setContextChangeError(false);

                        onChange({
                            ...defaultSettings,
                            contextChangeSettingsPanel: {
                                ...defaultSettings.contextChangeSettingsPanel,
                                settings: settings
                            }
                        });
                    }}
                />
            </SwitchExpansionPanel>

            <SwitchExpansionPanel
                label="Sentiment"
                isOpenDefault={defaultSettings.sentimentSettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        sentimentSettingsPanel: {
                            ...defaultSettings.sentimentSettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
                error={sentimentError}
            >
                <SentimentSettings
                    defaultSettings={defaultSettings.sentimentSettingsPanel.settings}
                    onInvalidSettings={() => {
                        setSentimentError(true);
                    }}
                    onChange={(settings: ISentimentSettings) => {
                        setSentimentError(false);

                        onChange({
                            ...defaultSettings,
                            sentimentSettingsPanel: {
                                ...defaultSettings.sentimentSettingsPanel,
                                settings: settings
                            }
                        });
                    }}
                />
            </SwitchExpansionPanel>

            <SwitchExpansionPanel
                label="Frequeny"
                isOpenDefault={defaultSettings.frequencySettingsPanel.isOpen}
                onChange={(isOpen: boolean) => {
                    onChange({
                        ...defaultSettings,
                        frequencySettingsPanel: {
                            ...defaultSettings.frequencySettingsPanel,
                            isOpen: isOpen
                        }
                    });
                }}
            ></SwitchExpansionPanel>

            {/* TODO: Turn validation error message into toast popup thing? */}
            <ValidationErrorMessage
                snackbar
                isError={[
                    synonymListError,
                    synonymNetworkError,
                    contextNetworkError,
                    contextChangeError,
                    sentimentError
                ]}
                message="There is an error with the current settings"
            />
        </div>
    );
}
