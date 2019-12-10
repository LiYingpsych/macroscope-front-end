import { useEffect, useState, useCallback, ReactElement, MutableRefObject } from "react";

interface IOptions {
    rootElement: MutableRefObject<null>;
    minWidth: number;
    containerComponent?: ReactElement;
}

export default function useResponsiveChart(options: IOptions) {
    const { minWidth, rootElement, containerComponent } = options;

    const [width, setWidth] = useState<number>(minWidth);

    const updateWidth = useCallback(() => {
        //@ts-ignore
        const currentWidth = rootElement.current.offsetWidth;

        const newWidth = currentWidth < minWidth ? minWidth : currentWidth;

        setWidth(newWidth);
    }, [rootElement, minWidth]);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);

        return function cleanup() {
            window.removeEventListener("resize", updateWidth);
        };
    }, [updateWidth]);

    useEffect(() => {
        updateWidth();
    }, [updateWidth, containerComponent]);

    return { responsiveWidth: width };
}
