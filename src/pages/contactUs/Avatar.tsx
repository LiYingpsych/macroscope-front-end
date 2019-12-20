import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EmailLink from "../../components/links/EmailLink";
import NewTabLink from "../../components/links/NewTabLink";

const useStyles = (avatarImageSize: number) =>
    makeStyles(() =>
        createStyles({
            avatarImage: {
                width: avatarImageSize,
                borderRadius: avatarImageSize / 2
            },
            textContainer: {
                flex: 1
            }
        })
    );

interface IAvatarProps {
    imgSource: string;
    name?: string;
    email?: string;
    websiteUrl?: string;
    imageSize?: number;
}

export default function Avatar(props: IAvatarProps) {
    const { imgSource, name, email, websiteUrl, imageSize = 100 } = props;
    const classes = useStyles(imageSize)();

    return (
        <Grid container spacing={2}>
            <Grid item>
                <NewTabLink href={websiteUrl}>
                    <img src={imgSource} alt={imgSource} className={classes.avatarImage} />
                </NewTabLink>
            </Grid>
            <Grid
                item
                container
                direction="column"
                justify="center"
                className={classes.textContainer}
            >
                <Grid item>
                    {typeof name === "undefined" ? null : (
                        <Typography variant="h5">{name}</Typography>
                    )}
                </Grid>
                <Grid item>
                    {typeof websiteUrl === "undefined" ? null : (
                        <NewTabLink href={websiteUrl}>Website</NewTabLink>
                    )}
                </Grid>
                <Grid item>
                    {typeof email === "undefined" ? null : (
                        <EmailLink email={email}>{email}</EmailLink>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
