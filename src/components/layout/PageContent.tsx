import React, { ReactNode } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { layout } from "../../globals";
import { MaxWidthProperty } from "csstype";

interface IStyleOptions {
    paddingTop: number;
    maxWidth?: MaxWidthProperty<string | number>;
}

const useStyles = (options: IStyleOptions) =>
    makeStyles((theme: Theme) =>
        createStyles({
            toolbar: theme.mixins.toolbar,
            content: {
                maxWidth: options.maxWidth,
                flexGrow: 1,
                padding: theme.spacing(layout.pageContentPadding),
                paddingTop: theme.spacing(options.paddingTop)
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
    maxWidth?: MaxWidthProperty<string | number>;
}

export default function PageContent(props: IProps) {
    const { children, paddingTop = 3, maxWidth = 1200 } = props;
    const classes = useStyles({ paddingTop, maxWidth })();

    return (
        <div className={classes.contentWrapper}>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </div>
        </div>
    );
}
