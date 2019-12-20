import React from "react";
import Link, { LinkBaseProps } from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";

export interface ILinkWrapperProps extends LinkBaseProps {}

export default function LinkWrapper(props: ILinkWrapperProps) {
    const { children, ...rest } = props;
    const theme = useTheme();
    return (
        <Link style={{ color: theme.palette.secondary.dark }} {...rest}>
            {children}
        </Link>
    );
}
