import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import OmitType from "../../utils/OmitType";

import LineChart, { ILineChartProps, lineChartVariant } from "./LineChart";
import { yCoordType, xCoordType } from "./models/ICartesianCoordinate";

import useTabs from "../tabs/useTabs";
import ITabItem from "../tabs/ITabItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs: {
            borderBottom: `1px solid ${theme.palette.grey[200]}`
        }
    })
);

interface ILineChartSelectionTabItem extends ITabItem {
    id: lineChartVariant;
}

interface IProps<S extends xCoordType, T extends yCoordType>
    extends OmitType<ILineChartProps<S, T>, "variant"> {
    defaultVariant?: lineChartVariant;
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

    const { tabsComponent, tabPanelsComponent } = useTabs({
        tabItems: tabs,
        initialTabIndex: getInitialTab(),
        tabsContainerProps: { className: classes.tabs }
    });

    return (
        <>
            {tabsComponent}
            {tabPanelsComponent}
        </>
    );
}
