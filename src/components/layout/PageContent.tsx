import React, { ReactNode } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
);

interface IProps {
    children?: ReactNode;
}

export default function PageContent(props: IProps) {
    const classes = useStyles();

    const { children } = props;

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </div>
    );
}
