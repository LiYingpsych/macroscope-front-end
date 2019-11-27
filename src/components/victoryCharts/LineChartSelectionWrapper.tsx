import React, { useState } from "react";
import { yCoordType, xCoordType } from "./models/ICartesianCoordinate";

import LineChart, { ILineChartProps, lineChartVariant } from "./LineChart";
import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "../tabs/TabPanel";
import ITabItem from "../tabs/ITabItem";
import OmitType from "../../utils/OmitType";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs: {
            borderBottom: `1px solid ${theme.palette.grey[200]}`
        }
    })
);

interface IProps<S extends xCoordType, T extends yCoordType>
    extends OmitType<ILineChartProps<S, T>, "variant"> {
    defaultVariant?: lineChartVariant;
}

interface ILineChartSelectionTabItem extends ITabItem {
    id: lineChartVariant;
}

export default function LineChartSelectionWrapper<S extends xCoordType, T extends yCoordType>(
    props: IProps<S, T>
) {
    const { defaultVariant = "default", ...rest } = props;
    const classes = useStyles();

    const tabs: ILineChartSelectionTabItem[] = [
        { id: "default", label: "default", content: <LineChart variant={"default"} {...rest} /> },
        { id: "zoomable", label: "zoomable", content: <LineChart variant={"zoomable"} {...rest} /> }
    ];

    const getInitialTab = () => {
        for (let index = 0; index < tabs.length; index++) {
            const tab = tabs[index];

            if (tab.id === defaultVariant) return index;
        }

        throw new Error("LineChartSelectionWrapper initial tab not found");
    };

    const [currentTabIndex, setCurrentTabIndex] = useState(getInitialTab());

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabIndex(newValue);
    };

    return (
        // TODO: extract simple tabs into custom hook
        <>
            <Tabs
                className={classes.tabs}
                // centered
                value={currentTabIndex}
                onChange={handleTabChange}
            >
                {tabs.map(tab => (
                    <Tab label={tab.label} />
                ))}
            </Tabs>
            {tabs.map((tab, i) => (
                <TabPanel currentTabIndex={currentTabIndex} tabPanelIndex={i}>
                    {tab.content}
                </TabPanel>
            ))}
        </>
    );
}
