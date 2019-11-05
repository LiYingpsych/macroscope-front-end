import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";

const useStyles = (avatarImageSize: number) =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                minWidth: "200px",
                padding: theme.spacing(2)
            },
            avatarImage: {
                width: avatarImageSize,
                borderRadius: avatarImageSize / 2
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
    imageSize?: number;
}

export default function PersonPanel(props: IPersonPanelProps) {
    const { person, imageSize = 100 } = props;

    const classes = useStyles(imageSize)();

    return (
        <Paper className={classes.root}>
            <Grid container direction="column" spacing={1}>
                <Grid container item justify="center">
                    <Grid item>
                        <img
                            src={person.avatarImgSource}
                            alt={person.avatarImgSource}
                            className={classes.avatarImage}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center">
                    <Grid item>
                        <div>{person.name}</div>
                    </Grid>
                </Grid>
                <Grid item>
                    <div>{person.description}</div>
                </Grid>
                <Grid item>
                    <div>{person.email}</div>
                </Grid>
                <Grid item>
                    {typeof person.websiteUrl === "undefined" ? null : (
                        <a target="_blank" rel="noopener noreferrer" href={person.websiteUrl}>
                            {person.websiteUrl}
                        </a>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}
