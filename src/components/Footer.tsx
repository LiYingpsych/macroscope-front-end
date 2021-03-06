import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GitLogoSvg from "images/GitLogoSvg";
import NewTabLink from "components/links/NewTabLink";
import { layout } from "globalConsts";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: layout.footerHeight,
            display: "flex",
            paddingRight: theme.spacing(4),
            backgroundColor: theme.palette.background.paper,
            zIndex: theme.zIndex.drawer + 1,
            borderTop: `1px solid ${theme.palette.grey[300]}`
        },
        logo: { display: "flex" },
        githubText: { marginLeft: theme.spacing(1) }
    })
);

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="flex-end" alignItems="center">
                <Grid item>
                    <NewTabLink href="https://github.com/StraightOuttaCrompton/macroscope-front-end">
                        <Grid container alignItems="center">
                            <Grid item className={classes.logo}>
                                <GitLogoSvg />
                            </Grid>
                            <Grid item className={classes.githubText}>
                                Source Code
                            </Grid>
                        </Grid>
                    </NewTabLink>
                </Grid>
            </Grid>
        </div>
    );
}
