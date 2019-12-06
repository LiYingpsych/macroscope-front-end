import React, { ReactNode } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(4)
        }
    })
);

interface IProps {
    title?: string;
    children?: ReactNode;
}

export default function Section(props: IProps) {
    const { title, children } = props;
    const classes = useStyles();

    return (
        <Grid container item direction="column" spacing={2} className={classes.root}>
            {typeof title === "undefined" ? null : (
                <Grid item>
                    <Typography variant="h4">{title}</Typography>
                </Grid>
            )}
            {React.Children.map(children, child => (
                <Grid item>{child}</Grid>
            ))}
        </Grid>
    );
}
