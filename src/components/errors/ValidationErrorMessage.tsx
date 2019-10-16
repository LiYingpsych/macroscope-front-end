import React, { ReactNode } from "react";
import ErrorMessage from "./ErrorMessage";

interface IProps {
    isError: boolean | boolean[];
    children?: ReactNode;
}

export default function ValidationErrorMessage(props: IProps) {
    const { isError, children = "There is a validation error" } = props;

    const validationMessage = <ErrorMessage>{children}</ErrorMessage>;

    let ReturnComponent = null;

    if (Array.isArray(isError)) {
        if (isError.includes(true)) ReturnComponent = validationMessage;
    } else {
        if (isError === true) ReturnComponent = validationMessage;
    }

    return ReturnComponent;
}
