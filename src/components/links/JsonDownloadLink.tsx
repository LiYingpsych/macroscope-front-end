import React from "react";
import LinkWrapper, { ILinkWrapperProps } from "./LinkWrapper";

interface IProps<T> extends ILinkWrapperProps {
    json: T;
    fileName?: string;
}

export default function JsonDownloadLink<T>(props: IProps<T>) {
    const { json, fileName = "data", children, ...rest } = props;

    const dataType = "text/json";
    const charset = "utf-8";

    return (
        <LinkWrapper
            href={`data:${dataType};charset=${charset},${encodeURIComponent(JSON.stringify(json))}`}
            download={`${fileName}.json`}
            {...rest}
        >
            {children}
        </LinkWrapper>
    );
}
