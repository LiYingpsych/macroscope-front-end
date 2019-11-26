export type xCoordType = Date | number;
export type yCoordType = number;

export default interface ICartesianCoordinate<S extends xCoordType, T extends yCoordType> {
    x: S;
    y: T;
}
