import React from "react";
import JSNetworkGraph from "./JSNetworkGraph";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

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

const NetworkGraph = <T, _>(props: IProps<T>) => {
    const { id, data, config = {} } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <JSNetworkGraph id={id} data={data} config={config} />
        </div>
    );
};

export default NetworkGraph;
