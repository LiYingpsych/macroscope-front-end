import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import GithubLogoSvg from "./images/GithubLogoSvg";
import NewTabLink from "./Links/NewTabLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            paddingRight: theme.spacing(4),
            backgroundColor: theme.palette.background.paper
        },
        logo: { display: "flex" },
        githubText: { marginLeft: theme.spacing(1) }
    })
);
export default function Footer() {
    const classes = useStyles();

    return (
        <>
            <Divider />
            <div className={classes.root}>
                <Grid container justify="flex-end" alignItems="center">
                    <Grid item>
                        <NewTabLink href="https://github.com/StraightOuttaCrompton/">
                            <Grid container alignItems="center">
                                <Grid item className={classes.logo}>
                                    <GithubLogoSvg />
                                </Grid>
                                <Grid item className={classes.githubText}>
                                    StraightOuttaCrompton
                                </Grid>
                            </Grid>
                        </NewTabLink>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
