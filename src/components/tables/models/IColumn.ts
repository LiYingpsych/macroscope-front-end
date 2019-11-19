export default interface IColumn<T> {
    label: string;
    subLabel?: string;
    dataPropertyKey: keyof T;
}
