import { decodeQueryString } from "../../utils/queryStringUtils";

export const getObjectFromQueryString = <T>(searchString: string, defaultObject: T): T => {
    if (searchString[0] === "?") {
        searchString = searchString.substr(1);
    }

    if (searchString.length === 0) {
        throw new Error("Search string cannot be empty");
    }

    return decodeQueryString<T>(searchString, Object.keys(defaultObject));
};
