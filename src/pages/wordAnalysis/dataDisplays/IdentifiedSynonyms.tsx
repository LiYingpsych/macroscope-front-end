import React, { useState, useEffect } from "react";
import ISynonymListSettings from "../models/ISynonymListSettings";
import { ClosestSearchMethod } from "../../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import { BackendApi } from "../../../services/backendApi/BackendApi";
import { IClosestDataModel, IClosestWordModel } from "../../../models/IClosestDataModel";

const backendApi = new BackendApi();

interface IProps {
    searchTerm: string;
    settings: ISynonymListSettings;
}

export default function IdentifiedSynonyms(props: IProps) {
    const { searchTerm, settings } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IClosestDataModel[]>([]);

    useEffect(() => {
        console.log("fetching data");

        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await backendApi.getClosest({
                    searchTerms: searchTerm.split(" "),
                    year: settings.year,
                    numberOfClosestWords: settings.numberOfSynonyms,
                    // TODO: extract method into default settings?
                    method: ClosestSearchMethod.SGNS
                });

                setData(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchTerm, settings]);

    return isLoading ? <div>Loading</div> : <SynonymList data={data} />;
}

interface ISynonymListProps {
    data: IClosestDataModel[];
}

function SynonymList(props: ISynonymListProps) {
    const { data } = props;

    // return (
    //     <>
    //         {data.map((datum: IClosestDataModel) => {
    //             return (
    //                 <div>
    //                     <div>{datum.primaryWord}</div>
    //                     {datum.closestWords.map((word: IClosestWordModel) => {
    //                         return <div>{word.word.value}</div>;
    //                     })}
    //                 </div>
    //             );
    //         })}
    //     </>
    // );
    return <div>SynonymList</div>;
}
