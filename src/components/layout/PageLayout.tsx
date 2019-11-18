import React, { useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import classnames from "classnames";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

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

import NotFoundPage from "../../pages/NotFoundPage";
import StickyFooter from "./StickyFooter";
import Footer from "../Footer";
import Grid from "@material-ui/core/Grid";
import MacroscopeLogo from "../images/MacroscopeLogo";

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
            marginLeft: drawerWidth,
            zIndex: theme.zIndex.drawer + 1
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
        drawerPaper: {
            width: drawerWidth
        },
        hidden: {
            display: "none"
        },
        title: {
            textTransform: "uppercase"
        },
        logo: {
            paddingRight: "12px",
            display: "flex",
            alignItems: "center"
        },
        tab: {
            "&:hover": {
                opacity: 1
            }
        },
        content: {
            flex: "1"
        },
        tabHighlight: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },
        fullHeight: {
            height: "100%"
        }
    })
);

export interface ITabItem {
    route: string;
    label: string;
    content: any;
}

interface IProps {
    deafultTab: ITabItem;
    tabItems: ITabItem[];
    title?: string;
}

export default function PageLayout(props: IProps) {
    const { title = "Macroscope", deafultTab, tabItems } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const classes = useStyles();
    const theme = useTheme();

    let location = useLocation();

    const getInitialTab = () => {
        for (let index = 0; index < tabItems.length; index++) {
            const tab = tabItems[index];

            if (tab.route === location.pathname) return index;
        }

        return -1; // Show not found page
    };

    const [currentTabIndex, setCurrentTabIndex] = useState(getInitialTab());

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabIndex(newValue);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const tabs = (
        orientation: "horizontal" | "vertical" = "horizontal",
        addSelectedHighlight: boolean = false
    ) => {
        const isHorizantal = orientation === "horizontal";
        return (
            <Tabs
                className={isHorizantal ? classes.fullHeight : ""}
                centered
                value={currentTabIndex}
                onChange={handleChange}
                classes={{ flexContainer: isHorizantal ? classes.fullHeight : "" }}
                orientation={orientation}
            >
                {tabItems.map((tab, index) => {
                    return (
                        <Tab
                            classes={{
                                selected: addSelectedHighlight ? classes.tabHighlight : undefined
                            }}
                            className={classes.tab}
                            label={tab.label}
                            value={index}
                            component={RouterLink}
                            to={tab.route}
                            key={`tab-${index}`}
                        />
                    );
                })}
                <Tab className={classes.hidden} value={-1} />
            </Tabs>
        );
    };

    const tabPanels = tabItems.map((tab, i) => {
        return (
            <div key={i} hidden={currentTabIndex !== i}>
                {tab.content}
            </div>
        );
    });

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

                    <div className={classnames(classes.appBarContents, classes.fullHeight)}>
                        <Link href={deafultTab.route} color="inherit" underline="none">
                            <Grid container>
                                <Grid item className={classes.logo}>
                                    <MacroscopeLogo size={30} />
                                </Grid>
                                <Grid item>
                                    <Hidden only="sm" implementation="css">
                                        <Typography className={classes.title} variant="h6" noWrap>
                                            {title}
                                        </Typography>
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Link>

                        <div className={classes.fullHeight} style={{ display: "flex" }}>
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
                        {tabs("vertical", true)}
                    </Drawer>
                </nav>
            </Hidden>
            <StickyFooter
                content={
                    <div className={classes.content}>
                        <Switch>
                            <Route
                                path={`(${tabItems.map(tab => tab.route).join("|")})`}
                                render={() => tabPanels}
                            />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                }
                footer={<Footer />}
            />
        </div>
    );
}
