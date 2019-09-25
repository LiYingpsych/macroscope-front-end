import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "../customIcons/SettingsIcon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        heading: {
            paddingLeft: "10px",
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        }
    })
);

export default function SearchSettings() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <SettingsIcon color="action" />
                    <Typography className={classes.heading}>Search Settings</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
