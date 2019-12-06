import React, { ReactNode } from "react";
import { onlyText } from "react-children-utilities";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface IProps extends TypographyProps {
    children?: ReactNode;
}

export default function Text(props: IProps) {
    const { children, ...rest } = props;

    // TODO: add spell check here. Rename component to SpellCheckedText
    console.log(onlyText(children));

    return <Typography {...rest}>{children}</Typography>;
}
