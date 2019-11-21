import React, { useRef, useState } from "react";
import JSNetworkGraph from "./JSNetworkGraph";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import assignDefaultValuesToObject from "../../utils/assignDefaultValuesToObject";

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

interface IGraphConfig {
    automaticRearrangeAfterDropNode?: boolean;
    collapsible?: boolean;
    directed?: boolean;
    height?: number;
    width?: number;
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

    const [width, setWidth] = useState<number | undefined>(undefined);

    const defaultConfig: IGraphConfig = {
        automaticRearrangeAfterDropNode: false,
        collapsible: false,
        directed: false,
        height: 250
    };

    // React.useEffect(() => {
    //     window.addEventListener("resize", updateWidthAndHeight);
    //     return () => window.removeEventListener("resize", updateWidthAndHeight);
    // });

    // React.useEffect(() => {
    //     window.addEventListener("load", updateWidthAndHeight);
    //     return () => window.removeEventListener("load", updateWidthAndHeight);
    // });

    React.useEffect(() => {
        console.log("hello");
        updateWidthAndHeight();
    }, [rootElement]);

    const updateWidthAndHeight = () => {
        console.log("updateWidthAndHeight");
        //@ts-ignore
        const currentWidth = rootElement.current.offsetWidth;

        console.log(currentWidth);

        setWidth(currentWidth);
        // setHeight(window.innerHeight);
    };

    return (
        <div className={classes.root} ref={rootElement}>
            {typeof width === "undefined" ? null : (
                <JSNetworkGraph
                    id={id}
                    data={data}
                    config={assignDefaultValuesToObject(defaultConfig, { ...config, width: width })}
                />
            )}
        </div>
    );
}
