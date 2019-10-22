import React from "react";
import JSNetworkGraph from "./JSNetworkGraph";

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
}

interface INetworkGraphLinks<T> {
    source: T;
    target: T;
}

const NetworkGraph = <T,>(props: IProps<T>) => {
    const { id, data, config = {} } = props;

    return <JSNetworkGraph id={id} data={data} config={config} />;
};

export default NetworkGraph;
