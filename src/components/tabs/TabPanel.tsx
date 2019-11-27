import React, { ReactNode } from "react";

interface IProps {
    currentTabIndex: number;
    tabPanelIndex: number;
    children?: ReactNode;
}

export default function TabPanel(props: IProps) {
    const { currentTabIndex, tabPanelIndex, children } = props;

    return <div hidden={currentTabIndex !== tabPanelIndex}>{children}</div>;
}
