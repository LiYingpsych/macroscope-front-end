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
import { closestMaxYear, synonymNetworkMaxYear } from "../../globals";
import { encodeQueryStringObject, decodeQueryString } from "../../utils/queryStringUtils";

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

interface ISearchSettings extends Object {
    synonymListSettingsPanel: ISettingPanel<ISynonymListSettings>;
    synonymNetworkSettingsPanel: ISettingPanel<ISynonymNetworkSettings>;
}

const getSettingsFromSearchString = (searchString: string): ISearchSettings => {
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
        }
    };

    if (searchString[0] === "?") {
        searchString = searchString.substr(1);
    }

    if (searchString.length === 0) {
        return defaultSettings;
    }

    try {
        return decodeQueryString<ISearchSettings>(searchString, Object.keys(defaultSettings));
    } catch (error) {
        return defaultSettings;
    }
};

type HandleSettingsModificationFunction = (oldSettings: ISearchSettings) => ISearchSettings;

export default function SearchSettings() {
    // TODO: Add clone function instead of JSON.parse(JSON.stringify(obj))
    const classes = useStyles();

    const { location, history } = useReactRouter();

    const parsedSettings = getSettingsFromSearchString(location.search);
    const [savedSettings, setSavedSettings] = useState(JSON.parse(JSON.stringify(parsedSettings)));
    const [unsavedSettings, setUnsavedSettings] = useState(
        JSON.parse(JSON.stringify(parsedSettings))
    );

    const [isUpdateable, setIsUpdateable] = useState(false);

    const onSettingsChange = (cb: (oldSettings: ISearchSettings) => ISearchSettings) => {
        handleSettingsChange(cb);

        // TODO: settings have not changed if isOpen is false - extract this logic into a function and only compare settings that are "open"
        const settingsHaveChanged =
            JSON.stringify(unsavedSettings) !== JSON.stringify(savedSettings);
        setIsUpdateable(settingsHaveChanged);
    };

    const handleSettingsChange = (
        handleModificationFunction: HandleSettingsModificationFunction
    ) => {
        const modifiedSettings = handleModificationFunction(
            JSON.parse(JSON.stringify(unsavedSettings))
        );
        setUnsavedSettings(modifiedSettings);
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
                        isOpenDefault={savedSettings.synonymListSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.synonymListSettingsPanel.isOpen = isOpen;
                                return oldSettings;
                            });
                        }}
                        error={synonymListError}
                    >
                        <SynonymListSettings
                            defaultSettings={savedSettings.synonymListSettingsPanel.settings}
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
                        isOpenDefault={savedSettings.synonymNetworkSettingsPanel.isOpen}
                        onChange={(isOpen: boolean) => {
                            onSettingsChange((oldSettings: ISearchSettings) => {
                                oldSettings.synonymNetworkSettingsPanel.isOpen = isOpen;
                                return oldSettings;
                            });
                        }}
                        error={synonymNetworkError}
                    >
                        <SynonymNetworkSettings
                            defaultSettings={savedSettings.synonymNetworkSettingsPanel.settings}
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
                            setSavedSettings(JSON.parse(JSON.stringify(unsavedSettings)));
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
