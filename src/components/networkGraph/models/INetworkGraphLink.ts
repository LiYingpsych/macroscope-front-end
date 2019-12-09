import ILinkConfig from "./configs/ILinkConfig";

export default interface INetworkGraphLink<T> extends ILinkConfig<T> {
    source: T;
    target: T;
}
