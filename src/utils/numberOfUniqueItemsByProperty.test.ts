import numberOfUniqueItemsByProperty from "./numberOfUniqueItemsByProperty";

interface item {
    prop1: string;
    prop2: number;
}

describe("numberOfUniqueItemsByProperty", () => {
    const uniqueItem1 = {
        prop1: "item1",
        prop2: 1
    };

    const uniqueItem2 = {
        prop1: "item2",
        prop2: 2
    };

    describe("when all items are unique by property", () => {
        const array = [uniqueItem1, uniqueItem2];

        it("should return correct length", () => {
            expect(numberOfUniqueItemsByProperty(array, "prop1")).toBe(array.length);
            expect(numberOfUniqueItemsByProperty(array, "prop2")).toBe(array.length);
        });
    });

    describe("when duplicate items exist", () => {
        describe("when duplicate items are equal", () => {
            const duplicateArray = [uniqueItem1, uniqueItem2];
            const array = [uniqueItem1, uniqueItem2, ...duplicateArray];

            it("should return correct length", () => {
                expect(numberOfUniqueItemsByProperty(array, "prop1")).toBe(
                    array.length - duplicateArray.length
                );
                expect(numberOfUniqueItemsByProperty(array, "prop2")).toBe(
                    array.length - duplicateArray.length
                );
            });
        });

        describe("when duplicate items are not equal", () => {
            const duplicateItem = {
                prop1: uniqueItem1.prop1,
                prop2: 0
            };

            const array = [uniqueItem1, uniqueItem2, duplicateItem];

            it("should return correct length", () => {
                expect(numberOfUniqueItemsByProperty(array, "prop1")).toBe(array.length - 1);
                expect(numberOfUniqueItemsByProperty(array, "prop2")).toBe(array.length);
            });
        });
    });
});
