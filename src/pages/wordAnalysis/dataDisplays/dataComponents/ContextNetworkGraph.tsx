import React from "react";

import NetworkGraph, { IGraphData } from "../../../../components/networkGraph";
import IContextNetworkData, {
    IContextNetworkNode,
    IContextNetworkEdge
} from "../../../../models/IContextNetworkData";

interface IProps {
    data: IContextNetworkData;
}

export default function ContextNetworkGraph(props: IProps) {
    const { data } = props;
    const networkGraphData: IGraphData<string> = {
        nodes: data.contextNetwork.nodes.map((node: IContextNetworkNode) => {
            return {
                id: node.word.value,
                size: node.size * 100
            };
        }),
        links: data.contextNetwork.edges.map((edge: IContextNetworkEdge) => {
            return {
                source: edge.source,
                target: edge.target
            };
        })
    };

    return <NetworkGraph id="Context-network-graph" data={networkGraphData} />;
}
