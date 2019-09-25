import React from "react";
import ResponsiveDrawer, { ITabItem } from "./components/ResponsiveDrawer";
// import { RouteComponentProps } from "react-router";
// import { Typography } from "@material-ui/core";

// interface IProps extends RouteComponentProps<{}> {}

export const HomePage: React.FC = () => {
    const mainNavTabs: ITabItem[] = [
        { label: "Word analysis", content: "Word analysis!" },
        { label: "About", content: "About!" },
        { label: "Contact us", content: "Contact us!" }
    ];
    return (
        <ResponsiveDrawer tabItems={mainNavTabs} />
        // <StickyFooter footer={<Footer />} content={<Content />}/>
    );
};

// const Footer: React.FC = () => {
//     return <div>footer</div>
// }
// const Content: React.FC = () => {
//     return <div>content</div>
// }
