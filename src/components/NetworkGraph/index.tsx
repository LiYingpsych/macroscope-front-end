import React, { useRef, useState } from "react";
import JSNetworkGraph from "./JSNetworkGraph";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import assignDefaultValuesToObject from "../../utils/assignDefaultValuesToObject";
import IGraphConfig from "./models/IGraphConfig";

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
    config?: IGraphConfig;
}

export interface IGraphData<T> {
    nodes: INetworkGraphNode<T>[];
    links: INetworkGraphLinks<T>[];
}

interface INetworkGraphNode<T> {
    id: T;
    size?: number;
}

interface INetworkGraphLinks<T> {
    source: T;
    target: T;
}

export default function NetworkGraph<T>(props: IProps<T>) {
    const { id, data, config = {} } = props;
    const classes = useStyles();

    const rootElement = useRef(null);

    const [width, setWidth] = useState<number>(0);

    const defaultConfig: IGraphConfig = {
        automaticRearrangeAfterDropNode: false,
        collapsible: false,
        directed: false,
        focusZoom: 1,
        focusAnimationDuration: 0.75,
        height: 400,
        nodeHighlightBehavior: false,
        linkHighlightBehavior: false,
        highlightDegree: 1,
        highlightOpacity: 1,
        maxZoom: 2,
        minZoom: 0.5,
        panAndZoom: false,
        staticGraph: false,
        staticGraphWithDragAndDrop: false,
        d3: {
            gravity: -200
        }
    };

    React.useEffect(() => {
        updateWidth();
    }, [rootElement]);

    const updateWidth = () => {
        //@ts-ignore
        const currentWidth = rootElement.current.offsetWidth;

        setWidth(currentWidth);
    };

    return (
        <div className={classes.root} ref={rootElement}>
            <JSNetworkGraph
                id={id}
                data={data}
                config={assignDefaultValuesToObject(defaultConfig, { ...config, width: width })}
            />
        </div>
    );
}
