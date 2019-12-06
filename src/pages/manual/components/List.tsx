import React, { ReactNode } from "react";

interface IProps {
    items: ReactNode[];
    ordered?: boolean;
}

export default function List(props: IProps) {
    const { items, ordered = false } = props;

    const childItems = items.map((item, i) => <li key={i}>{item}</li>);

    return ordered ? <ol>{childItems}</ol> : <ul>{childItems}</ul>;
}
