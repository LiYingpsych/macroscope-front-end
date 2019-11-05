import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "./Avatar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            minWidth: "200px",
            maxWidth: "500px",
            padding: theme.spacing(2)
        }
    })
);

export interface IPerson {
    avatarImgSource: string;
    name: string;
    description: string;
    email: string;
    websiteUrl?: string;
}

interface IPersonPanelProps {
    person: IPerson;
}

export default function PersonPanel(props: IPersonPanelProps) {
    const { person } = props;

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Avatar
                        imgSource={person.avatarImgSource}
                        name={person.name}
                        email={person.email}
                        websiteUrl={person.websiteUrl}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body2">{person.description}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
