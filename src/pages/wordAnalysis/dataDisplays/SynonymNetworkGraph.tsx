import React from "react";

import ISynonymNetworkData from "../../../models/ISynonymNetworkData";
import NetworkGraph, { IGraphData } from "../../../components/NetworkGraph";
import INode from "../../../models/INode";
import IEdge from "../../../models/IEdge";
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

interface IProps {
    data: ISynonymNetworkData;
}

export default function SynonymNetworkGraph(props: IProps) {
    const classes = useStyles();

    const { data } = props;
    const networkGraphData: IGraphData<string> = {
        nodes: data.synonymNetwork.nodes.map((node: INode) => {
            return {
                id: node.word.value
            };
        }),
        links: data.synonymNetwork.edges.map((edge: IEdge) => {
            return {
                source: edge.source,
                target: edge.target
            };
        })
    };

    return (
        <div className={classes.root}>
            <NetworkGraph
                id="Synonym-network-graph"
                data={networkGraphData}
                config={{ automaticRearrangeAfterDropNode: true }}
            />
        </div>
    );
}
