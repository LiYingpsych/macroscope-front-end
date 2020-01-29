import IColour from "./IColour";
import rainbowColours from "./rainbowColours";
import splitNumberLine from "utils/splitNumberLine";

interface INetworkGraphColour extends IColour {}

const networkGraphColours: INetworkGraphColour[] = [...rainbowColours];

export function getGroupColours(numberOfGroups: number): IColour[] {
    const lineLength = networkGraphColours.length - 1;

    return splitNumberLine(lineLength, numberOfGroups + 1).map(
        point => networkGraphColours[Math.floor(point)]
    );
}

export default networkGraphColours;
