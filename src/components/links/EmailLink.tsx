import React, { ReactNode } from "react";
import Link, { LinkBaseProps } from "@material-ui/core/Link";

interface IProps extends LinkBaseProps {
    email: string;
    children?: ReactNode;
}

export default function EmailLink(props: IProps) {
    const { email, children, ...rest } = props;
    return (
        <Link target="_top" href={`mailto:${email}`} {...rest}>
            {children}
        </Link>
    );
}
