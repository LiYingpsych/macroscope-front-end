export default class NonPositiveNumberError extends Error {
    constructor(propName: string, recevedValue: number) {
        super(`expected ${propName} to be a positive number, received ${recevedValue}`);
        this.name = "NonPositiveNumberError";
    }
}
