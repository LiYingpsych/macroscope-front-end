import React, { useState, ReactNode } from "react";
import {
    DomainPropType,
    VictoryZoomContainer,
    VictoryBrushContainer,
    VictoryAxis,
    BlockProps
} from "victory";
import ChartWrapper from "../ChartWrapper";

interface IContainerOptions {}

interface IBrushOptions {
    children?: ReactNode;
    padding?: BlockProps;
    height?: number;
}

type DimensionType = "x" | "y" | undefined;

interface IOptions {
    containerOptions?: IContainerOptions;
    brushOptions?: IBrushOptions;
    dimension?: DimensionType;
}

export default function useZoomable(options: IOptions) {
    const { containerOptions, brushOptions, dimension } = options;
    const [zoomDomain, setZoomDomain] = useState<DomainPropType>();
    const handleZoom = (domain: DomainPropType) => {
        setZoomDomain(domain);
    };

    return {
        zoomDomain: zoomDomain,
        handleZoom: handleZoom,
        zoomableContainerComponent: (
            <VictoryZoomContainer
                zoomDimension={dimension}
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
                {...containerOptions}
            />
        ),
        zoomableBrushComponent: (
            <CustomBrush
                zoomDomain={zoomDomain}
                handleZoom={handleZoom}
                dimension={dimension}
                {...brushOptions}
            />
        )
    };
}

interface IProps extends IBrushOptions {
    handleZoom: (domain: DomainPropType) => void;
    zoomDomain: DomainPropType | undefined;
    dimension?: DimensionType;
}

function CustomBrush(props: IProps) {
    const { handleZoom, zoomDomain, dimension, children, height, ...rest } = props;

    let _height = height;
    if (typeof height === "undefined" && dimension === "x") _height = 100;

    return (
        <ChartWrapper
            height={_height}
            containerComponent={
                <VictoryBrushContainer
                    brushDimension={dimension}
                    brushDomain={zoomDomain}
                    onBrushDomainChange={handleZoom}
                />
            }
            {...rest}
        >
            <VictoryAxis tickFormat={(t: any) => ""} />
            {children}
        </ChartWrapper>
    );
}
