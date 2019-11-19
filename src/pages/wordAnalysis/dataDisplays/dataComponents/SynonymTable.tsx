import React from "react";

import ISynonymListSettings from "../../models/ISynonymListSettings";
import IClosestData from "../../../../models/IClosestData";

import GenericTable from "../../../../components/tables/GenericTable";
import IColumn from "../../../../components/tables/models/IColumn";

interface IProps {
    settings: ISynonymListSettings;
    data: IClosestData;
}

interface ISynonymTableDataType {
    score: number;
    word: string;
}

export default function SynonymTable(props: IProps) {
    const { settings, data } = props;

    const columnData: IColumn<ISynonymTableDataType>[] = [
        {
            label: `Synonyms of ${data.primaryWord.value}`,
            subLabel: `(${settings.year})`,
            dataPropertyKey: "word"
        },
        {
            label: "Relative score",
            dataPropertyKey: "score"
        }
    ];

    const formattedData: ISynonymTableDataType[] = data.closestWords.map(datum => {
        return { score: datum.score, word: datum.word.value };
    });

    return (
        <GenericTable
            sorting={{
                order: "desc",
                orderBy: "score"
            }}
            // onRowClick={(item: IDataType) => {console.log(item)}}
            maxHeight={432}
            columnData={columnData}
            data={formattedData}
            size="small"
        />
    );
}
