import React, { ReactNode } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";

type anchorTye = "left" | "right";

const useStyles = (drawerWidth: number, anchor: anchorTye) =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: "flex",
                flexDirection: anchor === "left" ? "row" : "row-reverse"
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0
            },
            drawerPaper: {
                width: drawerWidth
            },
            toolbar: theme.mixins.toolbar
        })
    );

interface IProps {
    width?: number;
    children?: ReactNode;
    anchor?: anchorTye;
}

export default function ClippedDrawer(props: IProps) {
    const theme = useTheme();
    const { width = 240, children, anchor = theme.direction === "rtl" ? "right" : "left" } = props;
    const classes = useStyles(width, anchor)();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor={anchor}
            >
                <div className={classes.toolbar} />
                Drawer content
            </Drawer>
            {children}
        </div>
    );
}
