import React from "react";
import ChartWrapper from "../ChartWrapper";
import { VictoryScatter, VictoryScatterProps } from "victory";
import { useTheme } from "@material-ui/core/styles";
import useZoomable from "../commonHooks/useZoomable";

interface IScatterDataPoint {
    x: number;
    y: number;
    label?: string;
    fill?: string;
}

interface IProps extends VictoryScatterProps {
    data: IScatterDataPoint[];
}

export default function ScatterChart(props: IProps) {
    const { data, size = 7, ...rest } = props;

    const theme = useTheme();

    const padding = { left: 60, top: 20, right: 10, bottom: 60 };

    const Content = (
        <VictoryScatter
            data={data}
            style={{
                data: {
                    fill: ({ datum }) =>
                        typeof datum.fill === "undefined"
                            ? theme.palette.secondary.light
                            : datum.fill
                }
            }}
            size={size}
            {...rest}
        />
    );

    const { zoomableContainerComponent } = useZoomable({
        brushOptions: {
            padding: { top: 0, left: padding.left, right: padding.right, bottom: 0 },
            children: Content
        }
    });

    return (
        <>
            <ChartWrapper padding={padding} containerComponent={zoomableContainerComponent}>
                {Content}
            </ChartWrapper>
        </>
    );
}
