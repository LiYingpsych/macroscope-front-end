import React, { ReactNode, useState } from "react";

import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Theme } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/styles";
import { RouteComponentProps } from "react-router";

import { StickyFooter } from "./StickyFooter";

const permanentDrawerWidth = 150;
const paperDrawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%"
    },
    appBar: {
        position: "absolute",
        zIndex: 12001
        /* code to move the appBar to the right of the compressed navigation
        marginLeft: permanentDrawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${permanentDrawerWidth}px)`
        }*/
    },
    drawerPaper: {
        width: paperDrawerWidth
    },
    drawerPermanent: {
        width: permanentDrawerWidth,
        [theme.breakpoints.up("md")]: {
            position: "relative"
        },
        paddingTop: "64px"
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: "0px"
    }
}));

// https://github.com/CharlesStover/use-react-router
interface IProps extends RouteComponentProps<{}> {
    title?: string;
    mainDrawerContent?: ReactNode;
    compressedDrawerContent?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    backButton?: boolean;
}

export const ResponsiveDrawer: React.FC<IProps> = (props: IProps) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const classes = useStyles();
    const theme = useTheme() as Theme;

    const handleDrawerToggle = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };

    const {
        title,
        mainDrawerContent,
        compressedDrawerContent,
        content,
        footer,
        backButton
    } = props;

    const icon = backButton ? (
        <IconButton color="inherit" aria-label="go back" onClick={props.history.goBack}>
            <BackIcon />
        </IconButton>
    ) : (
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
            <MenuIcon />
        </IconButton>
    );

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    {icon}
                    <Typography variant="h6" color="inherit" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Hidden>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={drawerIsOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {mainDrawerContent}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPermanent
                    }}
                >
                    {compressedDrawerContent}
                </Drawer>
            </Hidden>
            <StickyFooter className={classes.content} content={content} footer={footer} />
        </div>
    );
};
