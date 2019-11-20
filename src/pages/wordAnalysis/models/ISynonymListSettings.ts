import SynonymListMethod from "./enums/SynonymListMethod";

export default interface ISynonymListSettings {
    year: number;
    numberOfSynonyms: number;
    method: SynonymListMethod;
}
