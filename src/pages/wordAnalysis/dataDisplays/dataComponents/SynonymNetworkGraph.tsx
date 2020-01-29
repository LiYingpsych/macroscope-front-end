import React from "react";

import ISynonymNetworkData, {
    ISynonymNetworkNode,
    ISynonymNetworkEdge
} from "models/ISynonymNetworkData";
import NetworkGraph from "components/networkGraph";
import IGraphData from "components/networkGraph/models/IGraphData";

interface IProps {
    data: ISynonymNetworkData;
}

export default function SynonymNetworkGraph(props: IProps) {
    const { data } = props;
    const networkGraphData: IGraphData<string> = {
        nodes: data.synonymNetwork.nodes.map((node: ISynonymNetworkNode) => {
            return {
                id: node.word.value
            };
        }),
        links: data.synonymNetwork.edges.map((edge: ISynonymNetworkEdge) => {
            return {
                source: edge.source,
                target: edge.target
            };
        })
    };

    return <NetworkGraph id="Synonym-network-graph" data={networkGraphData} />;
}
