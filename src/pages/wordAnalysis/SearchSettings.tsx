import React from "react";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../../icons/SettingsIcon";

import SwitchExpansionPanel from "../../components/SwitchExpansionPanel";
import SynonymListSettings, { ISynonymListSettings } from "./settings/SynonymListSettings";
import SynonymNetworkSettings from "./settings/SynonymNetworkSettings";
import ContextNetworkSettings from "./settings/ContextNetworkSettings";
import ContextChangeSettings from "./settings/ContextChangeSettings";
import SentimentSettings from "./settings/SentimentSettings";
import { closestMaxYear } from "../../globals";

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

export default function SearchSettings() {
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
    // const [settings, setSettings] = useState(defaultSettings);

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
                        // onChange={}
                    >
                        <SynonymListSettings
                            defaultSettings={defaultSettings.synonymListSettingsPanel.settings}
                            onChange={(_settings: ISynonymListSettings) => {
                                console.log(_settings);
                            }}
                        />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Synonym network">
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

                    <SwitchExpansionPanel label="Frequeny"></SwitchExpansionPanel>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
