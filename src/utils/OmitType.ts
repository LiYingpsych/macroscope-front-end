//https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
type OmitType<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default OmitType;
