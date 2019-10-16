import React, { ReactNode } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontWeight: "bold"
        }
    })
);

interface IProps {
    children?: ReactNode;
}

export default function Title(props: IProps) {
    const classes = useStyles();
    const { children } = props;

    return <Typography className={classes.root}>{children}</Typography>;
}
