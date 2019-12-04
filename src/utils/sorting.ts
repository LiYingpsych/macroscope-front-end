export type SortingOrder = "asc" | "desc";

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

interface IStabalizedArrayItem<T> {
    element: T;
    index: number;
}

export function stableSort<T>(array: T[], compareFunction: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => {
        return { element: el, index: index } as IStabalizedArrayItem<T>;
    });
    stabilizedThis.sort((a, b) => {
        const order = compareFunction(a.element, b.element);
        if (order !== 0) return order;
        return a.index - b.index;
    });
    return stabilizedThis.map(el => el.element);
}

export function getSortingCompareFunction<T>(
    order: SortingOrder,
    orderBy: keyof T
): (a: T, b: T) => number {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
