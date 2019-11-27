import React, { useState, HTMLAttributes } from "react";
import ITabItem from "./ITabItem";
import Tabs, { TabsTypeMap } from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import OmitType from "../../utils/OmitType";
import TabPanel from "./TabPanel";

type TabsProps = OmitType<OmitType<TabsTypeMap["props"], "onChange">, "value">;

interface IOptions {
    tabItems: ITabItem[];
    initialTabIndex?: number;
    tabsContainerProps?: TabsProps & HTMLAttributes<any>;
}

export default function useTabs(options: IOptions) {
    const { tabItems, initialTabIndex = 0, tabsContainerProps } = options;

    const [currentTabIndex, setCurrentTabIndex] = useState(initialTabIndex);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabIndex(newValue);
    };

    return {
        tabsComponent: (
            <Tabs value={currentTabIndex} onChange={handleTabChange} {...tabsContainerProps}>
                {tabItems.map((tab, i) => (
                    <Tab label={tab.label} key={i} />
                ))}
            </Tabs>
        ),
        tabPanelsComponent: tabItems.map((tab, i) => (
            <TabPanel currentTabIndex={currentTabIndex} tabPanelIndex={i} key={i}>
                {tab.content}
            </TabPanel>
        ))
    };
}
