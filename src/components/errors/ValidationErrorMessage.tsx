import React from "react";
import ErrorMessage from "./ErrorMessage";

interface IProps {
    isError: boolean | boolean[];
    message?: string;
    snackbar?: boolean;
}

export default function ValidationErrorMessage(props: IProps) {
    const { isError, message = "There is a validation error", snackbar = false } = props;

    const validationMessage = <ErrorMessage snackbar={snackbar} message={message} />;

    let ReturnComponent = null;

    if (Array.isArray(isError)) {
        if (isError.includes(true)) ReturnComponent = validationMessage;
    } else {
        if (isError === true) ReturnComponent = validationMessage;
    }

    return ReturnComponent;
}
