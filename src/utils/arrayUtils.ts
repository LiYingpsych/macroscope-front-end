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

// https://stackoverflow.com/questions/8864430/compare-javascript-array-of-objects-to-get-min-max
export function getMinValue<T>(array: T[]) {
    return array.reduce(function(prev, curr) {
        return prev < curr ? prev : curr;
    });
}

export function getMaxValue<T>(array: T[]) {
    return array.reduce(function(prev, curr) {
        return prev > curr ? prev : curr;
    });
}
