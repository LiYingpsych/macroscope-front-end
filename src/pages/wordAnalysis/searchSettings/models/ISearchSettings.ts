import ISettingPanel from "./ISettingPanel";

import { ISynonymListSettings } from "../settings/SynonymListSettings";
import { ISynonymNetworkSettings } from "../settings/SynonymNetworkSettings";
import { IContextNetworkSettings } from "../settings/ContextNetworkSettings";
import { ISemanticDriftSettings } from "../settings/SemanticDriftSettings";
import { IContextChangeSettings } from "../settings/ContextChangeSettings";
import { ISentimentSettings } from "../settings/SentimentSettings";
import { IFrequencySettings } from "../settings/FrequencySettings";

export default interface ISearchSettings {
    synonymListSettingsPanel: ISettingPanel<ISynonymListSettings>;
    synonymNetworkSettingsPanel: ISettingPanel<ISynonymNetworkSettings>;
    contextNetworkSettingsPanel: ISettingPanel<IContextNetworkSettings>;
    semanticDriftSettingsPanel: ISettingPanel<ISemanticDriftSettings>;
    contextChangeSettingsPanel: ISettingPanel<IContextChangeSettings>;
    sentimentSettingsPanel: ISettingPanel<ISentimentSettings>;
    frequencySettingsPanel: ISettingPanel<IFrequencySettings>;
}
