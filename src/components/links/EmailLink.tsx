import React from "react";
import LinkWrapper, { ILinkWrapperProps } from "./LinkWrapper";

interface IProps extends ILinkWrapperProps {
    email: string;
}

export default function EmailLink(props: IProps) {
    const { email, children, ...rest } = props;
    return (
        <LinkWrapper target="_top" href={`mailto:${email}`} {...rest}>
            {children}
        </LinkWrapper>
    );
}
