import React, { ReactNode } from "react";
import Link from "@material-ui/core/Link";

interface IProps<T> {
    json: T;
    fileName?: string;
    children?: ReactNode;
}

export default function JsonDownloadLink<T>(props: IProps<T>) {
    const { json, fileName = "data", children, ...rest } = props;

    const dataType = "text/json";
    const charset = "utf-8";

    return (
        <Link
            href={`data:${dataType};charset=${charset},${encodeURIComponent(JSON.stringify(json))}`}
            download={`${fileName}.json`}
            {...rest}
        >
            {children}
        </Link>
    );
}
