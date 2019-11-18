import React from "react";
import Fab from "@material-ui/core/Fab";
import GetApp from "@material-ui/icons/GetApp";
import Hidden from "@material-ui/core/Hidden";

export default function() {
    return (
        <>
            <Hidden smUp implementation="css">
                <Fab size="small" color="secondary" className={classes.exportButton}>
                    <GetApp />
                </Fab>
            </Hidden>

            <Hidden xsDown lgUp implementation="css">
                <Fab
                    variant="extended"
                    size="medium"
                    color="secondary"
                    className={classes.exportButton}
                >
                    <GetApp />
                    Export
                </Fab>
            </Hidden>

            <Hidden mdDown implementation="css">
                <Fab variant="extended" color="secondary" className={classes.exportButton}>
                    <GetApp />
                    Export Results
                </Fab>
            </Hidden>
        </>
    );
}
