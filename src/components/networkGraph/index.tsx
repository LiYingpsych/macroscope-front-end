import React, { useRef } from "react";
import JSNetworkGraph from "./JSNetworkGraph";
import { Theme, makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import assignDefaultValuesToObject from "../../utils/assignDefaultValuesToObject";
import INetworkGraphNode from "./models/INetworkGraphNode";
import INetworkGraphLink from "./models/INetworkGraphLink";
import IGraphConfig from "./models/configs/IGraphConfig";
import { SizeMe } from "react-sizeme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& svg": {
                width: "100% !important"
            }
        }
    })
);

interface IProps<T> {
    id: string;
    data: IGraphData<T>;
    config?: IGraphConfig<T>;
}

export interface IGraphData<T> {
    nodes: INetworkGraphNode[];
    links: INetworkGraphLink<T>[];
}

function scaleSizes<T>(data: IGraphData<T>): IGraphData<T> {
    let sizes: number[] = [];

    data.nodes.forEach(node => {
        if (typeof node.size !== "undefined") sizes.push(node.size);
    });

    const maxNodeSize = Math.max(...sizes);
    const minNodeSize = Math.max(...sizes);

    const nodeSizeMultiplier = 2000;

    return {
        ...data,
        nodes: data.nodes.map(node => {
            return {
                ...node,
                size:
                    typeof node.size === "undefined"
                        ? (minNodeSize / maxNodeSize) * nodeSizeMultiplier
                        : (node.size / maxNodeSize) * nodeSizeMultiplier
            };
        })
    };
}

function parseData<T>(data: IGraphData<T>): IGraphData<T> {
    const scaledSizesData = scaleSizes(data);

    return scaledSizesData;
}

export default function NetworkGraph<T>(props: IProps<T>) {
    const { id, data, config = {} } = props;
    const classes = useStyles();
    const theme = useTheme();

    const rootElement = useRef(null);

    const defaultConfig: IGraphConfig<T> = {
        automaticRearrangeAfterDropNode: false,
        collapsible: false,
        directed: false,
        focusZoom: 1,
        focusAnimationDuration: 0.75,
        height: 400,
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        highlightDegree: 1,
        highlightOpacity: 1,
        maxZoom: 2,
        minZoom: 0.5,
        panAndZoom: true,
        staticGraph: false, // not working when true
        staticGraphWithDragAndDrop: false, // not working true
        d3: {
            alphaTarget: 0.05,
            gravity: -200,
            linkLength: 100
            // linkStrength: 1 // for some reason this breaks the graph when uncommented
        },
        node: {
            color: theme.palette.secondary.light,
            fontColor: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
            fontWeight: "normal",
            highlightColor: theme.palette.secondary.main,
            highlightFontSize: theme.typography.fontSize,
            highlightFontWeight: "bold", // nodeHighlightBehavior and linkHighlightBehavior must be true for this to work
            highlightStrokeColor: "SAME",
            highlightStrokeWidth: 100,
            labelProperty: "id",
            mouseCursor: "pointer",
            opacity: 1,
            renderLabel: true,
            size: 200,
            strokeColor: "none",
            strokeWidth: 1.5,
            svg: "",
            symbolType: "circle",
            viewGenerator: null
        },
        link: {
            color: theme.palette.grey[200],
            fontColor: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
            fontWeight: "normal",
            highlightColor: theme.palette.grey[400],
            highlightFontSize: theme.typography.fontSize,
            highlightFontWeight: "bold", // nodeHighlightBehavior and linkHighlightBehavior must be true for this to work
            labelProperty: "id",
            mouseCursor: "default",
            opacity: 1,
            renderLabel: false,
            semanticStrokeWidth: false,
            strokeWidth: 1.5,
            type: "STRAIGHT"
        }
    };

    return (
        <div className={classes.root} ref={rootElement}>
            <SizeMe>
                {({ size }) => {
                    const { width } = size;
                    const _width = width === null ? undefined : width;

                    return typeof _width === "undefined" ? (
                        <div></div>
                    ) : (
                        <JSNetworkGraph
                            id={id}
                            data={parseData(data)}
                            config={assignDefaultValuesToObject(defaultConfig, {
                                ...config,
                                width: _width
                            })}
                        />
                    );
                }}
            </SizeMe>
        </div>
    );
}
