import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import PageContent from "../components/layout/PageContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(6)
        }
    })
);
export default function NotFoundPage() {
    const classes = useStyles();

    return (
        <PageContent>
            <Grid container direction="column" alignItems="center" className={classes.root}>
                <Grid item>
                    <Typography variant="h1">404</Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1" align="center">
                        We could not find the page you were looking for.
                    </Typography>
                </Grid>
            </Grid>
        </PageContent>
    );
}
