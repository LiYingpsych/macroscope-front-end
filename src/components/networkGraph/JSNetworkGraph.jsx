import React from "react";
import { Graph } from "react-d3-graph";

export default function JSNetworkGraph(props) {
    const { id, data, config } = props;

    // TODO: https://github.com/danielcaldas/react-d3-graph/issues/281
    // if (typeof config.d3 === "undefined") config.d3 = {};

    return (
        <Graph
            id={id}
            data={data}
            config={config}

            //  onClickGraph={onClickGraph}
            //  onClickNode={onClickNode}
            //  onDoubleClickNode={onDoubleClickNode}
            //  onRightClickNode={onRightClickNode}
            //  onClickLink={onClickLink}
            //  onRightClickLink={onRightClickLink}
            //  onMouseOverNode={onMouseOverNode}
            //  onMouseOutNode={onMouseOutNode}
            //  onMouseOverLink={onMouseOverLink}
            //  onMouseOutLink={onMouseOutLink}
        />
    );
}
