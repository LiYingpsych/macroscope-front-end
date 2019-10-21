import React from "react";
import JSNetworkGraph from "./JSNetworkGraph";

interface INode {}

interface IEdge {}

interface IProps {
    nodes: INode[];
    edges: IEdge[];
}

const NetworkGraph = (props: IProps) => {
    const { nodes, edges } = props;

    return <JSNetworkGraph nodes={nodes} edges={edges} />;
};

export default NetworkGraph;
