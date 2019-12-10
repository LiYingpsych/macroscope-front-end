import { useEffect, useState, useCallback, MutableRefObject } from "react";

interface IOptions {
    rootElement: MutableRefObject<null>;
    minWidth?: number;
}

export default function useResponsiveChart(options: IOptions) {
    const { minWidth = 809, rootElement } = options;

    const [width, setWidth] = useState<number>(minWidth);

    const calculateWidth = useCallback(() => {
        //@ts-ignore
        const currentWidth = rootElement.current.offsetWidth;
        const calculatedWidth = currentWidth < minWidth ? minWidth : currentWidth;

        return calculatedWidth;
    }, [rootElement, minWidth]);

    const updateWidth = useCallback(() => {
        setWidth(calculateWidth());
    }, [calculateWidth]);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);

        return function cleanup() {
            window.removeEventListener("resize", updateWidth);
        };
    }, [updateWidth]);

    useEffect(() => {
        updateWidth();
    }, [updateWidth]);

    return { responsiveWidth: width };
}
