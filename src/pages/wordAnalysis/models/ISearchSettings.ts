import ISettingPanel from "./ISettingPanel";
import ISynonymListSettings from "./ISynonymListSettings";
import ISynonymNetworkSettings from "./ISynonymNetworkSettings";
import IContextNetworkSettings from "./IContextNetworkSettings";
import ISemanticDriftSettings from "./ISemanticDriftSettings";
import IContextChangeSettings from "./IContextChangeSettings";
import ISentimentSettings from "./ISentimentSettings";
import IFrequencySettings from "./IFrequencySettings";

export default interface ISearchSettings {
    synonymListSettingsPanel: ISettingPanel<ISynonymListSettings>;
    synonymNetworkSettingsPanel: ISettingPanel<ISynonymNetworkSettings>;
    contextNetworkSettingsPanel: ISettingPanel<IContextNetworkSettings>;
    semanticDriftSettingsPanel: ISettingPanel<ISemanticDriftSettings>;
    contextChangeSettingsPanel: ISettingPanel<IContextChangeSettings>;
    sentimentSettingsPanel: ISettingPanel<ISentimentSettings>;
    frequencySettingsPanel: ISettingPanel<IFrequencySettings>;
}
