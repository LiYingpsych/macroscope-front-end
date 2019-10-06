import { useState } from "react";

export default function useModifyableObject<T>(
    defaultObject: T,
    onChange: (oldObject: T) => void = (oldObject: T) => {}
) {
    const [object, setObject] = useState(defaultObject);

    type HandleModificationFunction = (oldObject: T) => T;
    const handleSettingsChange = (handleModificationFunction: HandleModificationFunction) => {
        const modifiedObject = handleModificationFunction(object);
        setObject(modifiedObject);
        onChange(modifiedObject);
    };

    return handleSettingsChange;
}
