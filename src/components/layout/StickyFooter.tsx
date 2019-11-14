import React, { ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.grey[100],
            display: "flex",
            flex: 1,
            flexDirection: "column",
            minHeight: "100vh"
        },
        content: {
            flex: 1,
            display: "flex",
            justifyContent: "center"
        }
    })
);

interface IStickyFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    content: ReactNode;
    footer: ReactNode;
}

export default function StickyFooter(props: IStickyFooterProps) {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <div className={classes.content}>{props.content}</div>
            {props.footer}
        </main>
    );
}
