export default function numberOfUniqueItemsByProperty<T>(array: T[], prop: keyof T) {
    // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    return new Set(array.map(item => item[prop])).size;
}
