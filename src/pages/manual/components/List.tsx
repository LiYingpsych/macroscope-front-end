import React, { ReactNode } from "react";
import Text from "./Text";
import { useTheme } from "@material-ui/core";

interface IProps {
    items: ReactNode[];
    ordered?: boolean;
}

export default function List(props: IProps) {
    const { items, ordered = false } = props;

    const theme = useTheme();

    const childItems = items.map((item, i) => (
        <Text component="li" style={{ padding: theme.spacing(1) }} key={i}>
            {item}
        </Text>
    ));

    return ordered ? <ol>{childItems}</ol> : <ul>{childItems}</ul>;
}
