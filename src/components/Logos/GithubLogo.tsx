import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = (size: number) =>
    makeStyles(() =>
        createStyles({
            img: {
                width: size,
                maxHeight: "100%",
                maxWidth: "100%"
            }
        })
    );

interface IProps {
    size?: number;
}

export default function GithubLogo(props: IProps) {
    const { size = 512 } = props;

    const classes = useStyles(size)();

    return (
        <img
            src={process.env.PUBLIC_URL + "/logos/GitHub-Mark-32px.png"}
            alt="GitHub-Mark-32px.png"
            className={classes.img}
        />
    );
}
