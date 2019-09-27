import React, { ReactNode } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: "#f5f5f5",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            minHeight: "100vh"
        },
        content: {
            flex: 1,
            display: "flex",
            justifyContent: "center"
        },
        contentWrapper: {
            flex: 1,
            maxWidth: "1200px"
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
            <div className={classes.content}>
                <div className={classes.contentWrapper}>{props.content}</div>
            </div>
            {props.footer}
        </main>
    );
}
