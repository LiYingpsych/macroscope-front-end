import DefaultRequestParameters from "./DefaultRequestParameters";

export default interface IFrequencyRequestParameters extends DefaultRequestParameters {
    matchFullWord?: boolean;
    matchStart?: boolean;
    matchMiddle?: boolean;
    matchEnd?: boolean;
}
