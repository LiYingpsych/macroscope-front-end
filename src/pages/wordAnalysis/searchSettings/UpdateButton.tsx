import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";

interface IProps<T> {
    defaultObject: T;
    modifiedObject: T;
    onUpdate: () => void;
    areEqual?: (objA: T, objB: T) => boolean;
}

export default function UpdateButton<T>(props: IProps<T>) {
    const {
        defaultObject,
        modifiedObject,
        onUpdate,
        areEqual = (objA: T, objB: T) => {
            return JSON.stringify(objA) === JSON.stringify(objB);
        }
    } = props;

    return (
        <Button
            variant="contained"
            color="secondary"
            disabled={areEqual(defaultObject, modifiedObject)}
            onClick={() => {
                onUpdate();
            }}
        >
            Update
        </Button>
    );
}
