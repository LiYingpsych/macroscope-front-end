import React, { ReactNode } from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface IProps extends TypographyProps {
    children?: ReactNode;
}

export default function Text(props: IProps) {
    const { children, ...rest } = props;

    /* 
    TODO: add spell check here. Rename component to SpellCheckedText
    
    import { onlyText } from "react-children-utilities";
    const text = onlyText(children)
    console.log(text);
    */

    return <Typography {...rest}>{children}</Typography>;
}
