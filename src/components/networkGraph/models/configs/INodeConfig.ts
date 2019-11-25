import INetworkGraphNode from "../INetworkGraphNode";
import { ReactNode } from "react";
import INodeLinkCommonConfig from "./INodeLinkCommonConfig";

type ViewGeneratorFunctionType = (node: INetworkGraphNode) => ReactNode;

export default interface INodeConfig extends INodeLinkCommonConfig<INetworkGraphNode> {
    highlightStrokeColor?: string;
    highlightStrokeWidth?: number;
    size?: number;
    strokeColor?: string;
    svg?: string; // path to svg. For example "https://cdn.svgporn.com/logos/airflow.svg"
    symbolType?: "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye";
    viewGenerator?: null | ViewGeneratorFunctionType; // Allows custom rendering of node. eg (node: INetworkGraphNode<T>) => {return <div>{node.size}</div>}
}
