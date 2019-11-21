export default function assignDefaultValuesToObject<T>(defaultObj: T, recievedObj: T): T {
    let returnObj = recievedObj;

    for (var prop in defaultObj) {
        if (Object.prototype.hasOwnProperty.call(defaultObj, prop)) {
            if (typeof recievedObj[prop] === "undefined") returnObj[prop] = defaultObj[prop];
        }
    }

    return returnObj;
}
