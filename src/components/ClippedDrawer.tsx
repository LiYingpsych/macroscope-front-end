import React, { ReactNode } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import { footerHeight } from "../globals";

type anchorTye = "left" | "right";

const useStyles = (drawerWidth: number, anchor: anchorTye) =>
    makeStyles((theme: Theme) => {
        const convertToolbarMixin = () => {
            let returnObj = {};
            const mixin = theme.mixins.toolbar;

            const getHeight = (value: number | string) => `calc(100% - ${value}px)`;

            for (let prop in mixin) {
                if (Object.prototype.hasOwnProperty.call(mixin, prop)) {
                    // do stuff
                    if (prop === "minHeight") {
                        // @ts-ignore
                        returnObj["height"] = getHeight(mixin["minHeight"]);

                        // @ts-ignore
                        returnObj["marginTop"] = mixin["minHeight"];
                    } else {
                        // @ts-ignore
                        returnObj[prop] = {};

                        // @ts-ignore
                        returnObj[prop]["height"] = getHeight(mixin[prop]["minHeight"]);

                        // @ts-ignore
                        returnObj[prop]["marginTop"] = mixin[prop]["minHeight"];
                    }
                }
            }
            return returnObj;
        };

        return createStyles({
            root: {
                display: "flex",
                flexDirection: anchor === "left" ? "row" : "row-reverse"
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0
            },
            drawerPaper: {
                width: drawerWidth,
                ...convertToolbarMixin()
            },
            toolbar: theme.mixins.toolbar
        });
    });

interface IProps {
    width?: number;
    children?: ReactNode;
    anchor?: anchorTye;
    drawerContent?: ReactNode;
}

export default function ClippedDrawer(props: IProps) {
    const theme = useTheme();
    const {
        width = 240,
        children,
        anchor = theme.direction === "rtl" ? "right" : "left",
        drawerContent
    } = props;
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
                {typeof drawerContent === "undefined" ? null : drawerContent}
                <div style={{ flex: `1 0 ${footerHeight}px` }}></div>
            </Drawer>
            {children}
        </div>
    );
}
