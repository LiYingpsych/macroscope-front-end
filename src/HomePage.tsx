import React from "react";
import { StickyFooter } from "./components/StickyFooter";

export const HomePage: React.FC = () => {
    return (
        <StickyFooter footer={<Footer />} content={<Content />}/>
    );
};

const Footer: React.FC = () => {
    return <div>footer</div>
}
const Content: React.FC = () => {
    return <div>content</div>
}