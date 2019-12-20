import React from "react";
import LinkWrapper, { ILinkWrapperProps } from "./LinkWrapper";

interface IProps extends ILinkWrapperProps {}

export default function NewTabLink(props: IProps) {
    const { children, href, ...rest } = props;
    return (
        <LinkWrapper target="_blank" rel="noreferrer" href={href} {...rest}>
            {children}
        </LinkWrapper>
    );
}
