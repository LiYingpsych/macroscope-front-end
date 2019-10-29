type QueryParameterType = string | number | boolean;

export default class QueryParameter {
    readonly name: string;
    readonly value: QueryParameterType | undefined;

    constructor(name: string, value?: QueryParameterType | undefined) {
        this.name = name;
        this.value = value;
    }

    public buildParamString = () => {
        return this.getParamString(this.name, this.value).trim();
    };

    private getParamString = (name: string, value?: string | number | boolean) => {
        if (typeof value === "string" && value.length > 0) return `${name}=${value}`;
        else if (typeof value === "number") return `${name}=${value.toString()}`;
        else if (typeof value === "boolean" && value) return `${name}`;

        return "";
    };
}
