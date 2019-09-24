import React, {ReactNode} from "react";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    content: {
        flex: "1",
    }
}));

interface IStickyFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    content: ReactNode;
    footer:  ReactNode;
}

export const StickyFooter: React.FC<IStickyFooterProps> = (props: IStickyFooterProps) => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <div className={classes.content}>{props.content}</div>
            {props.footer}
        </main>
    );
};
