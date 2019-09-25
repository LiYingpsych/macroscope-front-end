import React from "react";
import classnames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import { NavigationList } from "./NavigationList";
import { Tabs, Tab } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import "./ResponsiveDrawer.css";

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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

interface ResponsiveDrawerProps {
    title?: string;
    children?: any;
}

export const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props: ResponsiveDrawerProps) => {
    const { title = "Macroscope" } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [tabIndex, setTabIndex] = React.useState(0);

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    const tabProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`
        };
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
                                <Tabs
                                    value={tabIndex}
                                    onChange={handleTabChange}
                                    aria-label="Navigation tabs"
                                    classes={{ flexContainer: "main-app-bar-height" }}
                                >
                                    <Tab label="Word Analysis" {...tabProps(0)} />
                                    <Tab label="About" {...tabProps(1)} />
                                    <Tab label="Contact Us" {...tabProps(2)} />
                                </Tabs>
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
                        <NavigationList />
                    </Drawer>
                </nav>
            </Hidden>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {/* <TabPanel value={tabIndex} index={0}>
                    Word analysis
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    About
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    Contact us
                </TabPanel> */}
                {props.children}
            </main>
        </div>
    );
};
