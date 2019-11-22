import ID3Config from "./ID3Config";
import INodeConfig from "./INodeConfig";
import ILinkConfig from "./ILinkConfig";

// Config documentation - https://goodguydaniel.com/react-d3-graph/docs/index.html
// TODO: in this interface all options are optional but that should not be the case
export default interface IGraphConfig<T> {
    automaticRearrangeAfterDropNode?: boolean;
    collapsible?: boolean;
    directed?: boolean;
    focusZoom?: number;
    focusAnimationDuration?: number;
    height?: number;
    nodeHighlightBehavior?: boolean;
    linkHighlightBehavior?: boolean;
    highlightDegree?: 0 | 1 | 2;
    highlightOpacity?: number;
    maxZoom?: number;
    minZoom?: number;
    panAndZoom?: boolean;
    staticGraph?: boolean;
    staticGraphWithDragAndDrop?: boolean;
    width?: number;

    d3?: ID3Config;
    node?: INodeConfig;
    link?: ILinkConfig<T>;
}
