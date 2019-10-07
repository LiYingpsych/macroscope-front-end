export function contains<T>(
    array: T[],
    item: T,
    areEqual: (a: T, b: T) => boolean = (a: T, b: T) => {
        return a === b;
    }
) {
    for (var i = 0; i < array.length; i++) {
        if (areEqual(array[i], item)) {
            return true;
        }
    }
    return false;
}
