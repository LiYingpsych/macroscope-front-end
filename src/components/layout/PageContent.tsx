import React, { ReactNode } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = (paddingTop: number) =>
    makeStyles((theme: Theme) =>
        createStyles({
            toolbar: theme.mixins.toolbar,
            content: {
                maxWidth: "1200px",
                flexGrow: 1,
                padding: theme.spacing(3),
                paddingTop: theme.spacing(paddingTop)
            },
            contentWrapper: {
                flex: 1,
                display: "flex",
                justifyContent: "center"
            }
        })
    );

interface IProps {
    children?: ReactNode;
    paddingTop?: number;
}

export default function PageContent(props: IProps) {
    const { children, paddingTop = 3 } = props;
    const classes = useStyles(paddingTop)();

    return (
        <div className={classes.contentWrapper}>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </div>
        </div>
    );
}
