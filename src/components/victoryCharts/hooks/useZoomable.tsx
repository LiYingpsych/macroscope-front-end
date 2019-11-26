import React, { useState, ReactNode } from "react";
import {
    DomainPropType,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryAxis,
    BlockProps
} from "victory";
import ChartWrapper from "../ChartWrapper";

export default function useZoomable() {
    const [zoomDomain, setZoomDomain] = useState<DomainPropType>();
    const handleZoom = (domain: DomainPropType) => {
        setZoomDomain(domain);
    };

    return {
        zoomableContainerComponent: (
            <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
            />
        ),
        ZoomableBrush: CustomBrush(zoomDomain, handleZoom)
    };
}

interface IProps {
    children?: ReactNode;
    padding?: BlockProps;
    height?: number;
}

const CustomBrush = (
    zoomDomain: DomainPropType | undefined,
    handleZoom: (domain: DomainPropType) => void
) => (props: IProps) => {
    const { children, padding, height = 100 } = props;
    return (
        <ChartWrapper
            padding={padding}
            height={height}
            containerComponent={
                <VictoryBrushContainer
                    brushDimension="x"
                    brushDomain={zoomDomain}
                    onBrushDomainChange={handleZoom}
                />
            }
        >
            <VictoryAxis tickFormat={(t: any) => ""} />
            {children}
        </ChartWrapper>
    );
};
