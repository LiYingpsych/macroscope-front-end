import React from "react";

import NetworkGraph, { IGraphData } from "../../../../components/networkGraph";
import IContextNetworkData, {
    IContextNetworkNode,
    IContextNetworkEdge
} from "../../../../models/IContextNetworkData";
import { getGroupColours } from "../../../../themes/colours/networkGraphColours";
import numberOfUniqueItemsByProperty from "../../../../utils/numberOfUniqueItemsByProperty";

interface IProps {
    data: IContextNetworkData;
}

export default function ContextNetworkGraph(props: IProps) {
    const { data } = props;

    const numberOfGroups = numberOfUniqueItemsByProperty(data.contextNetwork.nodes, "group");
    const groupColours = getGroupColours(numberOfGroups);

    const networkGraphData: IGraphData<string> = {
        nodes: data.contextNetwork.nodes.map((node: IContextNetworkNode) => {
            return {
                id: node.word.value,
                size: node.size,
                color: groupColours[node.group % groupColours.length].main
            };
        }),
        links: data.contextNetwork.edges.map((edge: IContextNetworkEdge) => {
            return {
                source: edge.source,
                target: edge.target
            };
        })
    };

    return (
        <NetworkGraph
            id="Context-network-graph"
            data={networkGraphData}
            config={{ highlightOpacity: 0.8, node: { opacity: 0.8 } }}
        />
    );
}
