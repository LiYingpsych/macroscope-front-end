import React, { useState } from "react";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../../../icons/SettingsIcon";

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
import UpdateButton from "./UpdateButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        heading: {
            paddingLeft: "10px",
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        },
        content: {
            flexDirection: "column"
        },
        expansionPanelSummary: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
        },
        expandIcon: {
            color: theme.palette.primary.contrastText
        }
    })
);

interface IProps {
    defaultSettings: ISearchSettings;
    onUpdate: (updatedSettings: ISearchSettings) => void;
}

export default function SearchSettings(props: IProps) {
    const classes = useStyles();
    const { defaultSettings, onUpdate } = props;

    // const [Settings, set Settings] = useState(
    //     defaultSettings
    // );
    // const [IsOpen, IsOpen] = useState(
    //     defaultSettings
    // );
    // const [Error, set Error] = useState(false);

    const [synonymListSettings, setSynonymListSettings] = useState(
        defaultSettings.synonymListSettingsPanel.settings
    );
    const [synonymListIsOpen, setSynonymListIsOpen] = useState(
        defaultSettings.synonymListSettingsPanel.isOpen
    );
    const [synonymListError, setSynonymListError] = useState(false);

    const [synonymNetworkSettings, setSynonymNetworkSettings] = useState(
        defaultSettings.synonymNetworkSettingsPanel.settings
    );
    const [synonymNetworkIsOpen, setSynonymNetworkIsOpen] = useState(
        defaultSettings.synonymNetworkSettingsPanel.isOpen
    );
    const [synonymNetworkError, setSynonymNetworkError] = useState(false);

    const [contextNetworkSettings, setContextNetworkSettings] = useState(
        defaultSettings.contextNetworkSettingsPanel.settings
    );
    const [contextNetworkIsOpen, setContextNetworkIsOpen] = useState(
        defaultSettings.contextNetworkSettingsPanel.isOpen
    );
    const [contextNetworkError, setContextNetworkError] = useState(false);

    const [semanticDriftSettings, setSemanticDriftSettings] = useState(
        defaultSettings.semanticDriftSettingsPanel.settings
    );
    const [semanticDriftIsOpen, setSemanticDriftIsOpen] = useState(
        defaultSettings.semanticDriftSettingsPanel.isOpen
    );

    const [contextChangeSettings, setContextChangeSettings] = useState(
        defaultSettings.contextChangeSettingsPanel.settings
    );
    const [contextChangeIsOpen, setContextChangeIsOpen] = useState(
        defaultSettings.contextChangeSettingsPanel.isOpen
    );
    const [contextChangeError, setContextChangeError] = useState(false);
    
    const [sentimentSettings, setSentimentSettings] = useState(
        defaultSettings.sentimentSettingsPanel.settings
    );
    const [sentimentIsOpen, setSentimentIsOpen] = useState(
        defaultSettings.sentimentSettingsPanel.isOpen
    );
    const [sentimentError, setSentimentError] = useState(false);

    const getUnsavedSettings = (): ISearchSettings => {
        return {
            synonymListSettingsPanel: {
                isOpen: synonymListIsOpen,
                settings: synonymListSettings
            },
            synonymNetworkSettingsPanel: {
                isOpen: true,
                settings: defaultSettings.synonymNetworkSettingsPanel.settings
            },
            contextNetworkSettingsPanel: {
                isOpen: true,
                settings: defaultSettings.contextNetworkSettingsPanel.settings
            },
            semanticDriftSettingsPanel: {
                isOpen: true,
                settings: defaultSettings.semanticDriftSettingsPanel.settings
            },
            contextChangeSettingsPanel: {
                isOpen: true,
                settings: defaultSettings.contextChangeSettingsPanel.settings
            },
            sentimentSettingsPanel: {
                isOpen: true,
                settings: defaultSettings.sentimentSettingsPanel.settings
            },
            frequencySettingsPanel: {
                isOpen: true,
                settings: defaultSettings.frequencySettingsPanel.settings
            }
        };
    };

    // TODO: consider having a global year
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                    className={classes.expansionPanelSummary}
                >
                    <SettingsIcon />
                    <Typography className={classes.heading}>Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.content}>
                    <SwitchExpansionPanel
                        label="Synonym list"
                        isOpenDefault={defaultSettings.synonymListSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setSynonymListIsOpen(isOpen);
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
                                setSynonymListSettings(settings);
                            }}
                        />
                    </SwitchExpansionPanel>
                    
                    <SwitchExpansionPanel
                        label="Synonym network"
                        isOpenDefault={defaultSettings.synonymNetworkSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setSynonymNetworkIsOpen(isOpen)
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
                                setSynonymNetworkSettings(settings)
                            }}
                        />
                    </SwitchExpansionPanel>

                    {/* <SwitchExpansionPanel
                        label="Context network"
                        isOpenDefault={defaultSettings.contextNetworkSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setContextNetworkIsOpen(isOpen)
                        }}
                        error={synonymNetworkError}
                    >
                        <ContextNetworkSettings
                            defaultSettings={defaultSettings.contextNetworkSettingsPanel.settings}
                            onInvalidSettings={() => {
                                setContextNetworkError(true);
                            }}
                            onChange={(settings: IContextNetworkSettings) => {
                                setContextNetworkError(false);
                                setContextNetworkSettings(settings)
                            }}
                        />
                    </SwitchExpansionPanel> */}

                    {/* <SwitchExpansionPanel
                        label="Semantic drift"
                        isOpenDefault={defaultSettings.semanticDriftSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setSemanticDriftIsOpen(isOpen)
                        }}
                    ></SwitchExpansionPanel> */}

                    {/* <SwitchExpansionPanel
                        label="Context change"
                        isOpenDefault={defaultSettings.contextChangeSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setUnsavedSettings({
                                ...unsavedSettings,
                                contextChangeSettingsPanel: {
                                    ...unsavedSettings.contextChangeSettingsPanel,
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

                                setUnsavedSettings({
                                    ...unsavedSettings,
                                    contextChangeSettingsPanel: {
                                        ...unsavedSettings.contextChangeSettingsPanel,
                                        settings: settings
                                    }
                                });
                            }}
                        />
                    </SwitchExpansionPanel> */}

                    {/* <SwitchExpansionPanel
                        label="Sentiment"
                        isOpenDefault={defaultSettings.sentimentSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setUnsavedSettings({
                                ...unsavedSettings,
                                sentimentSettingsPanel: {
                                    ...unsavedSettings.sentimentSettingsPanel,
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

                                setUnsavedSettings({
                                    ...unsavedSettings,
                                    sentimentSettingsPanel: {
                                        ...unsavedSettings.sentimentSettingsPanel,
                                        settings: settings
                                    }
                                });
                            }}
                        />
                    </SwitchExpansionPanel> */}

                    {/* <SwitchExpansionPanel
                        label="Frequeny"
                        isOpenDefault={defaultSettings.frequencySettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            setUnsavedSettings({
                                ...unsavedSettings,
                                frequencySettingsPanel: {
                                    ...unsavedSettings.frequencySettingsPanel,
                                    isOpen: isOpen
                                }
                            });
                        }}
                    ></SwitchExpansionPanel> */}

                    <UpdateButton<ISearchSettings>
                        defaultObject={defaultSettings}
                        modifiedObject={getUnsavedSettings()}
                        onUpdate={() => {
                            onUpdate(getUnsavedSettings());
                        }}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ValidationErrorMessage
                isError={[
                    synonymListError,
                    synonymNetworkError,
                    contextNetworkError,
                    contextChangeError,
                    sentimentError
                ]}
            >
                There is an error with the settings
            </ValidationErrorMessage>
        </div>
    );
}
