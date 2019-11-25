import IWord from "./IWord";
import ICartesianCoordinate from "../components/victoryCharts/models/ICartesianCoordinate";

export default interface ISentimentData {
    readonly primaryWord: IWord;
    readonly sentimentCoords: ICartesianCoordinate<number, number>[];
}
