import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Logo from "../../components/Logo";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function ManualPage() {
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justify="center" item xs={12} className={classes.gridItem}>
                <Grid item>
                    <Logo size={300} />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <Intro />
            </Grid>
        </Grid>
    );
}

function Intro() {
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                The Macroscope is a powerful tool built to interpret historical structure of
                language. It is designed to provide comprehensive analyses of historical meaning
                with the click of a button. This enables quick insights for a curious explorer,
                requiring little to no knowledge of linguistics.
            </Grid>
            <Grid item xs={12}>
                We are currently in active development.
            </Grid>
        </Grid>
    );
}
