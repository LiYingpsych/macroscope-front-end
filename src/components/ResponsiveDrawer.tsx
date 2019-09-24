import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";

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

interface ResponsiveDrawerProps {
    title?: string;
}

const navStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { display: "flex", justifyContent: "space-between", width: "275px" }
    })
);
const NavigationMenu: React.FC = () => {
    const classes = navStyles();

    return (
        <div className={classes.root}>
            <div>Word analysis</div>
            <div>About</div>
            <div>Contact us</div>
        </div>
    );
};

export const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (props: ResponsiveDrawerProps) => {
    const { title = "Macroscope" } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
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
                        <Hidden xsDown implementation="css">
                            <NavigationMenu />
                        </Hidden>
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
                        <NavigationMenu />
                    </Drawer>
                </nav>
            </Hidden>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim
                    praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis
                    tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio
                    aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
                    integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
                    scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet
                    massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi
                    tincidunt. Lorem donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget
                    nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque
                    volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.
                    Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
                    Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa
                    eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi
                    tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
                    Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
                    sagittis orci a.
                </Typography>
            </main>
        </div>
    );
};
