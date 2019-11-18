import React, { ReactNode } from "react";
import Link from "@material-ui/core/Link";

interface IProps {
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
