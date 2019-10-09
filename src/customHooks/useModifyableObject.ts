import { useState } from "react";

type HandleModificationFunction<T> = (oldObject: T) => T;

export default function useModifyableObject<T>(
    defaultObject: T,
    onChange: (oldObject: T) => void = (oldObject: T) => {}
): [T, (handleModificationFunction: HandleModificationFunction<T>) => void] {
    const [object, setObject] = useState(JSON.parse(JSON.stringify(defaultObject)));

    const handleSettingsChange = (handleModificationFunction: HandleModificationFunction<T>) => {
        const modifiedObject = handleModificationFunction(object);
        setObject(modifiedObject);
        onChange(modifiedObject);
    };

    return [object, handleSettingsChange];
}
