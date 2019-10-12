export interface ISettingsProps<T> {
    onChange: (settings: T) => void;
    defaultSettings: T;
    onInvalidSettings: () => void;
}
