import IDefaultRequestParameters from "./IDefaultRequestParameters";

export default interface IFrequencyRequestParameters extends IDefaultRequestParameters {
    matchFullWord?: boolean;
    matchStart?: boolean;
    matchMiddle?: boolean;
    matchEnd?: boolean;
}
