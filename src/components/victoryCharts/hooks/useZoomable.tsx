import React, { useState, ReactNode } from "react";
import {
    DomainPropType,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryAxis,
    BlockProps
} from "victory";
import ChartWrapper from "../ChartWrapper";

interface IOptions {
    children?: ReactNode;
    padding?: BlockProps;
    height?: number;
}

export default function useZoomable(options: IOptions) {
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
        zoomableBrushComponent: (
            <CustomBrush zoomDomain={zoomDomain} handleZoom={handleZoom} {...options} />
        )
    };
}

interface IProps extends IOptions {
    handleZoom: (domain: DomainPropType) => void;
    zoomDomain: DomainPropType | undefined;
}

function CustomBrush(props: IProps) {
    const { handleZoom, zoomDomain, children, padding, height = 100 } = props;

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
}
