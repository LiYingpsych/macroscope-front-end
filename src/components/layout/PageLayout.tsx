import React from "react";
import classnames from "classnames";

import useReactRouter from "use-react-router";
import { Link, Route, Switch, Redirect } from "react-router-dom";

import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "./PageLayout.css";
import NotFoundPage from "../../pages/NotFoundPage";
import StickyFooter from "./StickyFooter";
import Footer from "../Footer";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex"
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0
            }
        },
        appBar: {
            marginLeft: drawerWidth
        },
        appBarContents: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
                display: "none"
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
);

export interface ITabItem {
    route: string;
    label: string;
    content: any;
}

interface ResponsiveDrawerProps {
    tabItems: ITabItem[];
    title?: string;
}

export default function PageLayout(props: ResponsiveDrawerProps) {
    const { title = "Macroscope", tabItems } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const classes = useStyles();
    const theme = useTheme();
    const { location } = useReactRouter();

    const tabs = (orientation: "horizontal" | "vertical" = "horizontal") => {
        return (
            <Tabs
                value={location.pathname}
                classes={{ flexContainer: "main-app-bar-height" }}
                orientation={orientation}
            >
                {tabItems.map((tab, index) => {
                    return (
                        <Tab
                            label={tab.label}
                            value={tab.route}
                            component={Link}
                            to={tab.route}
                            key={`tab-${index}`}
                        />
                    );
                })}
            </Tabs>
        );
    };

    const pageRoutes = tabItems.map((tab, index) => {
        return <Route exact path={tab.route} render={() => tab.content} key={`route-${index}`} />;
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classnames(classes.appBar, "main-app-bar-height")}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <div className={classes.appBarContents}>
                        <Typography variant="h6" noWrap>
                            {title}
                        </Typography>
                        <div>
                            <Hidden xsDown implementation="css">
                                {tabs()}
                            </Hidden>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {tabs("vertical")}
                    </Drawer>
                </nav>
            </Hidden>
            <StickyFooter
                content={
                    <div className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to={tabItems[0].route} />}
                            />
                            {pageRoutes}
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                }
                footer={<Footer />}
            />
        </div>
    );
}
