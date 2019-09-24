import React from "react";
import { ResponsiveDrawer } from "./components/ResponsiveDrawer";
// import { RouteComponentProps } from "react-router";

// interface IProps extends RouteComponentProps<{}> {}

export const HomePage: React.FC = () => {
    return (
        <ResponsiveDrawer />
        // <StickyFooter footer={<Footer />} content={<Content />}/>
    );
};

// const Footer: React.FC = () => {
//     return <div>footer</div>
// }
// const Content: React.FC = () => {
//     return <div>content</div>
// }
