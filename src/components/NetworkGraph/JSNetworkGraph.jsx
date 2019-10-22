import React from "react";
import { Graph } from "react-d3-graph";

export default function(props) {
    const { id, data, config } = props;

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
