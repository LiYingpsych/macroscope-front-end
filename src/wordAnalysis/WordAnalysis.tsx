import React from "react";
import SearchBar from "../components/SearchBar";
import SearchSettings from "./SearchSettings";

export default function WordAnalysis() {
    return (
        <div>
            <SearchBar
                placeholder="Search word..."
                onSearch={(searchWord: string) => {
                    console.log(`Search word: ${searchWord}`);
                }}
            />
            <SearchSettings />
        </div>
    );
}
