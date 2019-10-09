import React, { useState } from "react";
import useReactRouter from "use-react-router";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../../icons/SettingsIcon";

import SwitchExpansionPanel from "../../components/SwitchExpansionPanel";
import SynonymListSettings, { ISynonymListSettings } from "./settings/SynonymListSettings";
import SynonymNetworkSettings, { ISynonymNetworkSettings } from "./settings/SynonymNetworkSettings";
// import ContextNetworkSettings from "./settings/ContextNetworkSettings";
// import ContextChangeSettings from "./settings/ContextChangeSettings";
// import SentimentSettings from "./settings/SentimentSettings";
import Button from "@material-ui/core/Button";
import { encodeQueryStringObject } from "../../utils/queryStringUtils";

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
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
        },
        expandIcon: {
            color: theme.palette.secondary.contrastText
        }
    })
);

interface ISettingPanel<T> {
    isOpen: boolean;
    settings: T;
}

export interface ISearchSettings {
    synonymListSettingsPanel: ISettingPanel<ISynonymListSettings>;
    synonymNetworkSettingsPanel: ISettingPanel<ISynonymNetworkSettings>;
}

type HandleSettingsModificationFunction = (oldSettings: ISearchSettings) => ISearchSettings;

interface IProps {
    defaultSettings: ISearchSettings;
}

export default function SearchSettings(props: IProps) {
    // TODO: Add clone function instead of JSON.parse(JSON.stringify(obj))
    const classes = useStyles();
    const { defaultSettings } = props;

    const { history } = useReactRouter();

    const [unsavedSettings, setUnsavedSettings] = useState(defaultSettings);
    const [isUpdateable, setIsUpdateable] = useState(false);

    const onSettingsChange = (handleModificationFunction: HandleSettingsModificationFunction) => {
        const modifiedSettings = handleModificationFunction(
            JSON.parse(JSON.stringify(unsavedSettings))
        );
        setUnsavedSettings(modifiedSettings);

        // TODO: settings have not changed if isOpen is false - extract this logic into a function and only compare settings that are "open"
        const settingsHaveChanged =
            JSON.stringify(modifiedSettings) !== JSON.stringify(defaultSettings);
        setIsUpdateable(settingsHaveChanged);
    };

    const [synonymListError, setSynonymListError] = useState(false);
    const [synonymNetworkError, setSynonymNetworkError] = useState(false);

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
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.synonymListSettingsPanel.isOpen = isOpen;
                                return oldSettings;
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
                                onSettingsChange((oldSettings: ISearchSettings) => {
                                    setSynonymListError(false);
                                    oldSettings.synonymListSettingsPanel.settings = synonymListSettings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel
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
                                onSettingsChange((oldSettings: ISearchSettings) => {
                                    setSynonymNetworkError(false);
                                    oldSettings.synonymNetworkSettingsPanel.settings = synonymNetworkSettings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    {/* <SwitchExpansionPanel label="Context network">
                        <ContextNetworkSettings />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Semantic drift"></SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Context change">
                        <ContextChangeSettings />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Sentiment">
                        <SentimentSettings />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Frequeny"></SwitchExpansionPanel> */}

                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!isUpdateable}
                        onClick={() => {
                            history.push(`?${encodeQueryStringObject(unsavedSettings)}`);
                            setIsUpdateable(false);
                        }}
                    >
                        Update
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
