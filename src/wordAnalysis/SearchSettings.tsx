import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../customIcons/SettingsIcon";
import SynonymListSettings from "./settings/SynonymListSettings";
import { Typography } from "@material-ui/core";
import SwitchExpansionPanel from "../components/SwitchExpansionPanel";

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
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.1)"
        }
    })
);

export default function SearchSettings() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={classes.expansionPanelSummary}
                >
                    <SettingsIcon color="action" />
                    <Typography className={classes.heading}>Search Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.content}>
                    <SwitchExpansionPanel label="Synonym list">
                        <SynonymListSettings />
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Semantic network">
                        <Typography>Semantic network settings</Typography>
                    </SwitchExpansionPanel>

                    <SwitchExpansionPanel label="Context network">
                        <Typography>Context network settings</Typography>
                    </SwitchExpansionPanel>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
