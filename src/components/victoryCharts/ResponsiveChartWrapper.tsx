import React, { useRef, useEffect, useState, useCallback } from "react";
import ChartWrapper, { IChartWrapperProps } from "./ChartWrapper";

interface IProps extends IChartWrapperProps {
    minWidth?: number;
}

export default function ResponsiveChartWrapper(props: IProps) {
    const { children = <div></div>, minWidth = 809, containerComponent, ...rest } = props;

    const rootElement = useRef(null);
    const [width, setWidth] = useState<number | undefined>(undefined);

    const updateWidth = useCallback(() => {
        //@ts-ignore
        const currentWidth = rootElement.current.offsetWidth;

        const newWidth =
            typeof minWidth === "undefined"
                ? undefined
                : currentWidth < minWidth
                ? minWidth
                : currentWidth;
        setWidth(newWidth);
    }, [minWidth]);

    useEffect(() => {
        updateWidth();
    }, [updateWidth, containerComponent]);

    useEffect(() => {
        window.addEventListener("resize", updateWidth);

        return function cleanup() {
            window.removeEventListener("resize", updateWidth);
        };
    }, [updateWidth]);

    return (
        <div ref={rootElement}>
            <ChartWrapper width={width} containerComponent={containerComponent} {...rest}>
                {children}
            </ChartWrapper>
        </div>
    );
}
