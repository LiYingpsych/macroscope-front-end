import React from "react";
import ResponsiveDrawer, { ITabItem } from "./components/ResponsiveDrawer";
import { WordAnalysis } from "./wordAnalysis/WordAnalysis";

export const HomePage: React.FC = () => {
    const mainNavTabs: ITabItem[] = [
        { label: "Word analysis", content: <WordAnalysis /> },
        { label: "Manual", content: "Manual!" },
        { label: "Contact us", content: "Contact us!" }
    ];
    return <ResponsiveDrawer tabItems={mainNavTabs} />;
};
