type LabelPropertyFunctionType<T> = (payload: T) => string;

export default interface INodeLinkCommonConfig<T> {
    color?: string;
    fontColor?: string;
    fontSize?: number;
    fontWeight?: string;
    highlightColor?: string;
    highlightFontSize?: number;
    highlightFontWeight?: string;
    labelProperty?: string | LabelPropertyFunctionType<T>;
    mouseCursor?: string;
    opacity?: number;
    renderLabel?: boolean;
    strokeWidth?: number;
}
