import assignDefaultValuesToObject from "./assignDefaultValuesToObject";

describe("assignDefaultValuesToObject", () => {
    const defaultPropName = "deafult";
    const defaultPropValue = true;

    describe("when recievedObj is missing default property", () => {
        it("should assign default property value to recievedObj", () => {
            const result = assignDefaultValuesToObject({ [defaultPropName]: defaultPropValue }, {});

            expect(result[defaultPropName]).toBe(defaultPropValue);
        });
    });

    describe("when recievedObj contains default property", () => {
        it("should not assign default property value to recievedObj", () => {
            const recievedObjPropValue = false;

            const result = assignDefaultValuesToObject(
                { [defaultPropName]: defaultPropValue },
                { [defaultPropName]: recievedObjPropValue }
            );

            expect(result[defaultPropName]).toBe(recievedObjPropValue);
        });
    });

    describe("when recievedObj contains a non default propery", () => {
        it("should preserve no default property value", () => {
            const nonDefaultPropName = "nonDeafult";
            const nonDefaultPropValue = "value";

            const result = assignDefaultValuesToObject(
                { [defaultPropName]: defaultPropValue },
                { [nonDefaultPropName]: nonDefaultPropValue }
            );

            expect(result[nonDefaultPropName]).toBe(nonDefaultPropValue);
        });
    });
});
