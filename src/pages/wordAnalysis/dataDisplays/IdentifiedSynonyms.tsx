import React, { useState, useEffect } from "react";
import ISynonymListSettings from "../models/ISynonymListSettings";
import { ClosestSearchMethod } from "../../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import { BackendApi } from "../../../services/backendApi/BackendApi";
import { IClosestDataModel, IClosestWordModel } from "../../../models/IClosestDataModel";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import { TableHead, TableCell, TableBody, TableRow } from "@material-ui/core";

const backendApi = new BackendApi();

interface IProps {
    searchTerm: string;
    settings: ISynonymListSettings;
}

export default function IdentifiedSynonyms(props: IProps) {
    const { searchTerm, settings } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IClosestDataModel>();

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await backendApi.getClosest({
                    searchTerm: searchTerm,
                    year: settings.year,
                    numberOfClosestWords: settings.numberOfSynonyms,
                    // TODO: extract method into default settings?
                    method: ClosestSearchMethod.SGNS
                });

                setData(response);
            } catch (error) {
                // TODO: handle error in a meaningful way
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchTerm, settings]);

    return <Paper>{isLoading ? <div>Loading</div> : <SynonymsTable data={data} />}</Paper>;
}

interface ISynonymsTableProps {
    data?: IClosestDataModel;
}

function SynonymsTable(props: ISynonymsTableProps) {
    const { data } = props;

    if (typeof data === "undefined") return null;

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>{data.primaryWord.value} synonyms</TableCell>
                    <TableCell>Relative score</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.closestWords.map((synonym: IClosestWordModel) => {
                    return (
                        <TableRow>
                            <TableCell>{synonym.word.value}</TableCell>
                            <TableCell>{synonym.score}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
