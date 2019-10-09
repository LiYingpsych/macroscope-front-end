import queryString from "query-string";

export const encodeQueryStringObject = <T extends object>(obj: T) => {
    let encodableObject = {};
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        // @ts-ignore
        encodableObject[key] = JSON.stringify(obj[key]);
    }

    return queryString.stringify(encodableObject);
};

export const decodeQueryString = <T>(qs: string, keys: string[]) => {
    const decoded = queryString.parse(qs) as object;

    let returnObject = {};
    keys.forEach((key: string) => {
        const containsKey = key in decoded;

        if (!containsKey) {
            throw new Error(`Query string object does not have property ${key}`);
        }

        // @ts-ignore
        returnObject[key] = JSON.parse(decoded[key]);
    });

    return returnObject as T;
};
