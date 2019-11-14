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

export default function MacroscopeLogo(props: IProps) {
    const { size = 512 } = props;

    const classes = useStyles(size)();

    return (
        <img src={process.env.PUBLIC_URL + "/logo512.png"} alt="logo512" className={classes.img} />
    );
}
