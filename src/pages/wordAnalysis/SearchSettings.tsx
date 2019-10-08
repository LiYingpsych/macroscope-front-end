import React, { useState } from "react";
import useReactRouter from "use-react-router";
import queryString from "query-string";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../../icons/SettingsIcon";

import SwitchExpansionPanel from "../../components/SwitchExpansionPanel";
import SynonymListSettings, { ISynonymListSettings } from "./settings/SynonymListSettings";
// import SynonymNetworkSettings from "./settings/SynonymNetworkSettings";
// import ContextNetworkSettings from "./settings/ContextNetworkSettings";
// import ContextChangeSettings from "./settings/ContextChangeSettings";
// import SentimentSettings from "./settings/SentimentSettings";
import Button from "@material-ui/core/Button";
import { closestMaxYear } from "../../globals";
import useModifyableObject from "../../customHooks/useModifyableObject";

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

interface ISearchSettings {
    synonymListSettingsPanel: ISettingPanel<ISynonymListSettings>;
}

const encodeSettings = <T,>(obj: T, propName: string = "obj") => {
    return queryString.stringify({
        [propName]: JSON.stringify(obj)
    });
};

const decodeSettings = <T,>(qs: string, propName: string = "obj") => {
    const decoded = queryString.parse(qs);

    // @ts-ignore
    return JSON.parse(decoded[propName]) as T;
};

export default function SearchSettings() {
    // TODO: on update - add settings to url
    // URL encode settings object and append to query string
    // ?settings=ENCODED_SETTINGS_OBJECT
    // on load check query string for settings object and validate items

    const classes = useStyles();

    const defaultSettings: ISearchSettings = {
        synonymListSettingsPanel: {
            isOpen: false,
            settings: {
                year: closestMaxYear,
                numberOfSynonyms: 5
            }
        }
    };

    const settingsPropName = "settings";
    const encoded = encodeSettings<ISearchSettings>(defaultSettings, settingsPropName);
    console.log(encoded);

    const decoded = decodeSettings<ISearchSettings>(encoded, settingsPropName);
    console.log(decoded);

    // const { history, location, match } = useReactRouter();
    // console.log(location.search)

    const [settings, handleSettingsChange] = useModifyableObject(defaultSettings);

    const [synonymListError, setSynonymListError] = useState(false);

    // TODO: consider having a global year?
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
                            handleSettingsChange((oldSettings: ISearchSettings) => {
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
                                handleSettingsChange((oldSettings: ISearchSettings) => {
                                    setSynonymListError(false);
                                    oldSettings.synonymListSettingsPanel.settings = synonymListSettings;
                                    return oldSettings;
                                });
                            }}
                        />
                    </SwitchExpansionPanel>

                    {/* <SwitchExpansionPanel label="Synonym network">
                        <SynonymNetworkSettings />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Context network">
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
                        onClick={() => {
                            console.log(settings);
                        }}
                    >
                        Update
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
