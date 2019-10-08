import queryString from "query-string";

export const encodeQueryStringObject = <T>(obj: T, propName: string = "obj") => {
    return queryString.stringify({
        [propName]: JSON.stringify(obj)
    });
};

export const decodeQueryString = <T>(qs: string, propName: string = "obj") => {
    const decoded = queryString.parse(qs);

    // @ts-ignore
    return JSON.parse(decoded[propName]) as T;
};
