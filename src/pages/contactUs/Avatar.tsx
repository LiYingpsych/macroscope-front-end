import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = (avatarImageSize: number) =>
    makeStyles((theme: Theme) =>
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
                <img src={imgSource} alt={imgSource} className={classes.avatarImage} />
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
                    {typeof email === "undefined" ? null : (
                        <Link target="_top" href={`mailto:${email}`}>
                            Email
                        </Link>
                    )}
                </Grid>
                <Grid item>
                    {typeof websiteUrl === "undefined" ? null : (
                        <Link target="_blank" rel="noopener noreferrer" href={websiteUrl}>
                            Website
                        </Link>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
