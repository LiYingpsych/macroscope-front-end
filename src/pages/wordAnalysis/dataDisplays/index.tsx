import React from "react";
import ISearchSettings from "../searchSettings/models/ISearchSettings";

// const backendApi = new BackendApi();

// const getData = () => {
//     return backendApi
//         .getClosest({
//             searchTerms: ["hello", "there"],
//             year: 1990,
//             numberOfClosestWords: 5,
//             method: ClosestSearchMethod.SGNS
//         })
//         .then(data => {
//             console.log(data);
//         });
// };

interface IProps {
    searchTerm: string;
    settings: ISearchSettings;
}

export default function DataDisplays(props: IProps) {
    const { searchTerm, settings } = props;

    console.log("hey nonny no");
    console.log(searchTerm);
    console.log(settings);

    return <div>Data displays</div>;
}
