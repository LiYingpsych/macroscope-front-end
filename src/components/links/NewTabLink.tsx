import React, { ReactNode } from "react";
import Link, { LinkBaseProps } from "@material-ui/core/Link";

interface IProps extends LinkBaseProps {
    href: string;
    children?: ReactNode;
}

export default function NewTabLink(props: IProps) {
    const { children, href, ...rest } = props;
    return (
        <Link target="_blank" rel="noreferrer" href={href} {...rest}>
            {children}
        </Link>
    );
}
