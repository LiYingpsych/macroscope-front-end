import React from "react";
import ChartWrapper from "../ChartWrapper";
import {
    VictoryScatter,
    VictoryScatterProps,
    StringOrNumberOrCallback,
    EventCallbackInterface,
    VictoryAxis
} from "victory";
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

type VictoryScatterEventTarget = "data" | "labels" | "parent";

export default function ScatterChart(props: IProps) {
    const { data, size = 7, ...rest } = props;

    const theme = useTheme();

    const padding = { left: 0, top: 0, right: 0, bottom: 0 };

    const highlightLabel = (): EventCallbackInterface<"labels", StringOrNumberOrCallback> => {
        return {
            target: "labels",
            mutation: (props: any) => {
                return {
                    style: Object.assign({}, props.style, {
                        fontWeight: "bold",
                        backgroundColor: "red"
                    })
                };
            }
        };
    };

    const highlightDataPoint = (): EventCallbackInterface<"data", StringOrNumberOrCallback> => {
        return {
            target: "data",
            mutation: (props: any) => {
                return {
                    style: Object.assign({}, props.style, {
                        opacity: 1
                    })
                };
            }
        };
    };

    const resetTargets = (...targets: VictoryScatterEventTarget[]) => {
        return targets.map(target => {
            return {
                target: target,
                mutation: () => {
                    return null;
                }
            };
        });
    };

    const Content = (
        //@ts-ignore
        <VictoryScatter
            // domainPadding={20}
            data={data}
            style={{
                data: {
                    opacity: 0.7,
                    fill: ({ datum }) =>
                        typeof datum.fill === "undefined"
                            ? theme.palette.secondary.light
                            : datum.fill
                }
            }}
            size={size}
            events={[
                {
                    target: "data",
                    eventHandlers: {
                        onMouseOver: () => {
                            return [highlightLabel(), highlightDataPoint()];
                        },
                        onMouseLeave: () => {
                            return [...resetTargets("labels", "data")];
                        }
                    }
                }
            ]}
            {...rest}
        />
    );

    const { zoomableContainerComponent } = useZoomable();

    return (
        <>
            <ChartWrapper
                domainPadding={50}
                padding={padding}
                containerComponent={zoomableContainerComponent}
            >
                {Content}
                <VictoryAxis tickFormat={(t: any) => ""} />
                <VictoryAxis dependentAxis tickFormat={(t: any) => ""} />
            </ChartWrapper>
        </>
    );
}
