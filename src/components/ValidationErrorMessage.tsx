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
    isError: boolean | boolean[];
    children?: ReactNode;
}

export default function ValidationErrorMessage(props: IProps) {
    const classes = useStyles();

    const { isError, children = "There is a validation error" } = props;

    const validationMessage = <Typography className={classes.root}>{children}</Typography>;

    let ReturnComponent = null;

    if (Array.isArray(isError)) {
        if (isError.includes(true)) ReturnComponent = validationMessage;
    } else {
        if (isError === true) ReturnComponent = validationMessage;
    }

    return ReturnComponent;
}
