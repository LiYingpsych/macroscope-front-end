import React, { useRef, useEffect, useState } from "react";
import ChartWrapper, { IChartWrapperProps } from "./ChartWrapper";

interface IProps extends IChartWrapperProps {
    minWidth?: number;
}

export default function ResponsiveChartWrapper(props: IProps) {
    const { children = <div></div>, minWidth, ...rest } = props;

    const rootElement = useRef(null);
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const updateWidth = () => {
            //@ts-ignore
            const currentWidth = rootElement.current.offsetWidth;

            const newWidth =
                typeof minWidth === "undefined"
                    ? "undefined"
                    : currentWidth < minWidth
                    ? minWidth
                    : currentWidth;
            setWidth(newWidth);
        };

        window.addEventListener("resize", updateWidth);
        updateWidth();

        return function cleanup() {
            window.removeEventListener("resize", updateWidth);
        };
    }, [rootElement, minWidth]);

    return (
        <div ref={rootElement}>
            <ChartWrapper width={width} {...rest}>
                {children}
            </ChartWrapper>
        </div>
    );
}
