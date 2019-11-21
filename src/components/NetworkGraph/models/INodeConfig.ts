import INetworkGraphNode from "./INetworkGraphNode";
import { ReactNode } from "react";

type LabelPropertyFunctionType = (node: INetworkGraphNode<any>) => string;
type ViewGeneratorFunctionType = (node: INetworkGraphNode<any>) => ReactNode;

export default interface INodeConfig {
    color?: string;
    fontColor?: string;
    fontSize?: number;
    fontWeight?: string;
    highlightColor?: string;
    highlightFontSize?: number;
    highlightFontWeight?: string;
    highlightStrokeColor?: string;
    highlightStrokeWidth?: number;
    labelProperty?: string | LabelPropertyFunctionType;
    mouseCursor?: string;
    opacity?: number;
    renderLabel?: boolean;
    size?: number;
    strokeColor?: string;
    strokeWidth?: number;
    svg?: string; // path to svg. For example "https://cdn.svgporn.com/logos/airflow.svg"
    symbolType?: "circle" | "cross" | "diamond" | "square" | "star" | "triangle" | "wye";
    viewGenerator?: null | ViewGeneratorFunctionType; // Allows custom rendering of node. eg (node: INetworkGraphNode<T>) => {return <div>{node.size}</div>}
}
