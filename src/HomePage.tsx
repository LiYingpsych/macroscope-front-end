import React from "react";
import ResponsiveDrawer, { ITabItem } from "./components/ResponsiveDrawer";

export const HomePage: React.FC = () => {
    const mainNavTabs: ITabItem[] = [
        { label: "Word analysis", content: "Word analysis!" },
        { label: "About", content: "About!" },
        { label: "Contact us", content: "Contact us!" }
    ];
    return <ResponsiveDrawer tabItems={mainNavTabs} />;
};
