// const unique = [...new Set(array.map(item => item.age))];??
export default function numberOfUniqueItemsByProperty<T>(array: T[], prop: keyof T) {
    let length = 0;
    let keys: T[keyof T][] = [];

    for (let i = 0; i < array.length; i++) {
        const item = array[i][prop];

        if (keys.includes(item)) continue;

        keys.push(item);
        length++;
    }

    return length;
}
