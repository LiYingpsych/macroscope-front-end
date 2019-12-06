import React, { ReactNode } from "react";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

interface IProps {
    children?: ReactNode;
}

export default function Note(props: IProps) {
    const { children } = props;

    const theme = useTheme();

    return (
        <Typography style={{ color: theme.palette.grey[600], fontWeight: "bold" }}>
            {children}
        </Typography>
    );
}
