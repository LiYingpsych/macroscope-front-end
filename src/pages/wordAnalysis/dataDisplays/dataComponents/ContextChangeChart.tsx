import React from "react";
import IContextChangeData, { IContextChangeWord } from "../../../../models/IContextChangeData";
import ChangeBarChart, {
    IChangeBarData
} from "../../../../components/victoryCharts/changeBarChart/ChangeBarChart";

interface IProps {
    data: IContextChangeData;
}

function mapWordsToData(contextChangeWords: IContextChangeWord[]): IChangeBarData[] {
    return contextChangeWords.map(contextPoint => {
        return {
            label: contextPoint.word.value,
            length: Math.abs(contextPoint.dif)
        };
    });
}

export default function ContextChangeChart(props: IProps) {
    const { data } = props;

    const increasingData = mapWordsToData(data.increasingWords);
    const decreasingData = mapWordsToData(data.decreasingWords);

    return <ChangeBarChart increasingData={increasingData} decreasingData={decreasingData} />;
}
