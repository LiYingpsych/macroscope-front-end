import splitNumberLine from "./splitNumberLine";
import NonPositiveNumberError from "../errors/NonPositiveNumberError";

describe("splitNumberLine", () => {
    describe("when lineLength is not positive", () => {
        it("should throw error when lineLength is negative", () => {
            expect(() => {
                splitNumberLine(-1, 1);
            }).toThrowError(new NonPositiveNumberError("lineLength", -1));
        });

        it("should throw error when lineLength is 0", () => {
            expect(() => {
                splitNumberLine(0, 1);
            }).toThrowError(new NonPositiveNumberError("lineLength", 0));
        });
    });

    describe("when numberOfSections is not positive", () => {
        it("should throw error when numberOfSections is negative", () => {
            expect(() => {
                splitNumberLine(123, -1);
            }).toThrowError(new NonPositiveNumberError("numberOfSections", -1));
        });

        it("should throw error when numberOfSections is 0", () => {
            expect(() => {
                splitNumberLine(123, 0);
            }).toThrowError(new NonPositiveNumberError("numberOfSections", 0));
        });
    });

    describe("when params are positive numbers", () => {
        it("should return correct points of separation", () => {
            expect(splitNumberLine(9, 3)).toEqual([3, 6]);
            expect(splitNumberLine(12, 2)).toEqual([6]);
            expect(splitNumberLine(321, 10)).toEqual([
                32.1,
                64.2,
                96.30000000000001,
                128.4,
                160.5,
                192.60000000000002,
                224.70000000000002,
                256.8,
                288.90000000000003
            ]);
        });

        it("should return array of length 1 less than numberOfSections", () => {
            for (let i = 1; i <= 5; i++) {
                const result = splitNumberLine(123, i);

                expect(result.length).toEqual(i - 1);
            }
        });
    });
});
