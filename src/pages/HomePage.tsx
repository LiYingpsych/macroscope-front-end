import React from "react";
import WordAnalysisPage from "./wordAnalysis/WordAnalysisPage";
import PageLayout, { ITabItem } from "../components/layout/PageLayout";

export default function HomePage() {
    const mainNavTabs: ITabItem[] = [
        { label: "Word analysis", content: <WordAnalysisPage /> },
        { label: "Manual", content: "Manual!" },
        { label: "Contact us", content: "Contact us!" }
    ];
    return <PageLayout tabItems={mainNavTabs} />;
}
