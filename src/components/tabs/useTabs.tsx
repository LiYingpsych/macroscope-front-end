import React, { useState, HTMLAttributes } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ITabItem from "./ITabItem";
import Tabs, { TabsTypeMap } from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import OmitType from "utils/OmitType";
import TabPanel from "./TabPanel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tab: {
            "&:hover": {
                opacity: 1
            }
        },
        selectedTabHighlight: {
            backgroundColor: theme.palette.grey[50],
            boxShadow: `inset 0 0 7px ${theme.palette.grey[300]}`
        }
    })
);

type TabsProps = OmitType<OmitType<TabsTypeMap["props"], "onChange">, "value">;

interface IOptions {
    tabItems: ITabItem[];
    initialTabIndex?: number;
    tabsContainerProps?: TabsProps & HTMLAttributes<any>;
    addHoverHighlight?: boolean;
    selectedClassName?: string;
}

export default function useTabs(options: IOptions) {
    const classes = useStyles();
    const {
        tabItems,
        initialTabIndex = 0,
        tabsContainerProps,
        addHoverHighlight = true,
        selectedClassName = classes.selectedTabHighlight
    } = options;

    const [currentTabIndex, setCurrentTabIndex] = useState(initialTabIndex);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabIndex(newValue);
    };

    return {
        tabsComponent: (
            <Tabs value={currentTabIndex} onChange={handleTabChange} {...tabsContainerProps}>
                {tabItems.map((tab, i) => (
                    <Tab
                        classes={{
                            selected: selectedClassName
                        }}
                        className={addHoverHighlight ? classes.tab : undefined}
                        label={tab.label}
                        key={i}
                    />
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
