import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import GithubLogo from "./Logos/GithubLogo";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            paddingRight: theme.spacing(6),
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
                        <Link target="_blank" href="https://github.com/StraightOuttaCrompton/">
                            <Grid container alignItems="center">
                                <Grid item className={classes.logo}>
                                    <GithubLogo size={24} />
                                </Grid>
                                <Grid item className={classes.githubText}>
                                    StraightOuttaCrompton
                                </Grid>
                            </Grid>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
