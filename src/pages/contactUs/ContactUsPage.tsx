import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PersonPanel, { IPerson } from "./PersonPanel";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        personPanelContainer: {
            flex: "1 0 auto",
            display: "flex",
            justifyContent: "center"
        }
    })
);
export default function ContactUsPage() {
    const classes = useStyles();

    const peopleData: IPerson[] = [
        {
            avatarImgSource: "https://ia803008.us.archive.org/24/items/avatar_20190816/avatar.png",
            name: "My Name",
            description: "This is the description.",
            email: "person@email.com",
            websiteUrl: "https://example.com"
        },
        {
            avatarImgSource: "https://ia803008.us.archive.org/24/items/avatar_20190816/avatar.png",
            name: "My Name",
            description: "This is the description.",
            email: "person@email.com",
            websiteUrl: "https://example.com"
        },
        {
            avatarImgSource: "https://ia803008.us.archive.org/24/items/avatar_20190816/avatar.png",
            name: "My Name",
            description: "This is the description.",
            email: "person@email.com",
            websiteUrl: "https://example.com"
        },
        {
            avatarImgSource: "https://ia803008.us.archive.org/24/items/avatar_20190816/avatar.png",
            name: "My Name",
            description: "This is the description.",
            email: "person@email.com",
            websiteUrl: "https://example.com"
        },
        {
            avatarImgSource: "https://ia803008.us.archive.org/24/items/avatar_20190816/avatar.png",
            name: "My Name",
            description: "This is the description.",
            email: "person@email.com",
            websiteUrl: "https://example.com"
        }
    ];

    return (
        <Grid container justify="center" spacing={2}>
            {peopleData.map((person, i) => (
                <Grid item className={classes.personPanelContainer}>
                    <PersonPanel person={person} key={i} />
                </Grid>
            ))}
        </Grid>
    );
}
