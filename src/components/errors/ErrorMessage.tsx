import React, { ReactNode } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.error.main
        }
    })
);

interface IProps {
    children?: ReactNode;
}

export default function ErrorMessage(props: IProps) {
    const classes = useStyles();

    const { children = "An error occured" } = props;

    return <Typography className={classes.root}>{children}</Typography>;
}
