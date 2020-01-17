import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = (size?: number) =>
    makeStyles(() =>
        createStyles({
            img: {
                width: typeof size === "undefined" ? "unset" : size,
                maxHeight: "100%",
                maxWidth: "100%"
            }
        })
    );

interface IProps {
    /* 
        Image src is relative to the public folder.
        If the image is located at /public/image.png
        then the src attribute should be /image.png
    */
    src: string;
    alt: string;
    size?: number;
}

export default function Image(props: IProps) {
    const { src, alt, size } = props;

    const classes = useStyles(size)();

    return <img src={process.env.PUBLIC_URL + src} alt={alt} className={classes.img} />;
}
