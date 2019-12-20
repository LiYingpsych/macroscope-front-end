import React, { ReactNode } from "react";
import { useTheme } from "@material-ui/core/styles";
import Text from "./Text";

interface IProps {
    children?: ReactNode;
}

export default function Note(props: IProps) {
    const { children } = props;

    const theme = useTheme();

    return <Text style={{ color: theme.palette.grey[600], fontWeight: "bold" }}>{children}</Text>;
}
