import IDefaultRequestParameters from "./IDefaultRequestParameters";
import ClosestSearchMethodRequestParameter from "./enums/ClosestSearchMethodRequestParameter";

export default interface IClosestRequestParameters extends IDefaultRequestParameters {
    year: number;
    numberOfClosestWords: number;
    method: ClosestSearchMethodRequestParameter;
}
