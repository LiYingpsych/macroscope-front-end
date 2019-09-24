import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles } from "@material-ui/core";

const navStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { display: "flex", justifyContent: "space-between", width: "275px" }
    })
);

export const NavigationList: React.FC = () => {
    const classes = navStyles();

    return (
        <div className={classes.root}>
            <div>Word analysis</div>
            <div>About</div>
            <div>Contact us</div>
        </div>
    );
};
