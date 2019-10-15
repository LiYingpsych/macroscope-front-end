import React, { useState, useEffect } from "react";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../../../icons/SettingsIcon";

import SwitchExpansionPanel from "../../../components/SwitchExpansionPanel";

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

interface IValidationErrorProps {
    errors: boolean[];
}

const ValidationErrorMessage = (props: IValidationErrorProps) => {
    const { errors } = props;

    return errors.includes(true) ? <Typography>There is an error with settings</Typography> : null;
};

interface IProps {
    defaultSettings: ISearchSettings;
    onUpdate: (updatedSettings: ISearchSettings) => void;
}

export default function SearchSettings(props: IProps) {
    // TODO: Add clone function instead of JSON.parse(JSON.stringify(obj))
    const classes = useStyles();
    const { defaultSettings, onUpdate } = props;

    const [unsavedSettings, setUnsavedSettings] = useState(defaultSettings);

    const [synonymListError, setSynonymListError] = useState(false);
    const [synonymNetworkError, setSynonymNetworkError] = useState(false);
    const [contextNetworkError, setContextNetworkError] = useState(false);
    const [contextChangeError, setContextChangeError] = useState(false);
    const [sentimentError, setSentimentError] = useState(false);

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
                            setUnsavedSettings({
                                ...unsavedSettings,
                                synonymListSettingsPanel: {
                                    ...unsavedSettings.synonymListSettingsPanel,
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
                            onChange={(synonymListSettings: ISynonymListSettings) => {
                                setSynonymListError(false);
                                setUnsavedSettings({
                                    ...unsavedSettings,
                                    synonymListSettingsPanel: {
                                        ...unsavedSettings.synonymListSettingsPanel,
                                        settings: synonymListSettings
                                    }
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    {/* <SwitchExpansionPanel
                        label="Synonym network"
                        isOpenDefault={defaultSettings.synonymNetworkSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.synonymNetworkSettingsPanel.isOpen = isOpen;
                                return oldSettings;
                            });
                        }}
                        error={synonymNetworkError}
                    >
                        <SynonymNetworkSettings
                            defaultSettings={defaultSettings.synonymNetworkSettingsPanel.settings}
                            onInvalidSettings={() => {
                                setSynonymNetworkError(true);
                            }}
                            onChange={(synonymNetworkSettings: ISynonymNetworkSettings) => {
                                setSynonymNetworkError(false);

                                onSettingsChange((oldSettings: ISearchSettings) => {
                                    oldSettings.synonymNetworkSettingsPanel.settings = synonymNetworkSettings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel
                        label="Context network"
                        isOpenDefault={defaultSettings.contextNetworkSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.contextNetworkSettingsPanel.isOpen = isOpen;
                                return oldSettings;
                            });
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

                                onSettingsChange((oldSettings: ISearchSettings) => {
                                    oldSettings.contextNetworkSettingsPanel.settings = settings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel
                        label="Semantic drift"
                        isOpenDefault={defaultSettings.semanticDriftSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.semanticDriftSettingsPanel.isOpen = isOpen;
                                return oldSettings;
                            });
                        }}
                    ></SwitchExpansionPanel>

                    <SwitchExpansionPanel
                        label="Context change"
                        isOpenDefault={defaultSettings.contextChangeSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.contextChangeSettingsPanel.isOpen = isOpen;
                                return oldSettings;
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

                                onSettingsChange((oldSettings: ISearchSettings) => {
                                    oldSettings.contextChangeSettingsPanel.settings = settings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel
                        label="Sentiment"
                        isOpenDefault={defaultSettings.sentimentSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.sentimentSettingsPanel.isOpen = isOpen;
                                return oldSettings;
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

                                onSettingsChange((oldSettings: ISearchSettings) => {
                                    oldSettings.sentimentSettingsPanel.settings = settings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel
                        label="Frequeny"
                        isOpenDefault={defaultSettings.frequencySettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.frequencySettingsPanel.isOpen = isOpen;
                                return oldSettings;
                            });
                        }}
                    ></SwitchExpansionPanel> */}

                    <UpdateButton
                        defaultObject={defaultSettings}
                        modifiedObject={unsavedSettings}
                        onUpdate={() => {
                            onUpdate(unsavedSettings);
                        }}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ValidationErrorMessage
                errors={[
                    synonymListError,
                    synonymNetworkError,
                    contextNetworkError,
                    contextChangeError,
                    sentimentError
                ]}
            />
        </div>
    );
}
