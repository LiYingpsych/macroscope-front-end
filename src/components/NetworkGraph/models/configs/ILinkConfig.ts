import INodeLinkCommonConfig from "./INodeLinkCommonConfig";
import INetworkGraphLink from "../INetworkGraphLink";

export default interface ILinkConfig<T> extends INodeLinkCommonConfig<INetworkGraphLink<T>> {
    semanticStrokeWidth?: boolean;
    type?: "STRAIGHT" | "CURVE_SMOOTH" | "CURVE_FULL";
}
