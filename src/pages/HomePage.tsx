import React from "react";
import WordAnalysisPage from "./wordAnalysis/WordAnalysisPage";
import PageLayout, { ITabItem } from "../components/layout/PageLayout";

export default function HomePage() {
    const mainNavTabs: ITabItem[] = [
        { route: "/", label: "Word analysis", content: <WordAnalysisPage /> },
        { route: "/manual", label: "Manual", content: "Manual!" },
        { route: "/contactus", label: "Contact us", content: "Contact us!" }
    ];
    return <PageLayout tabItems={mainNavTabs} />;
}
