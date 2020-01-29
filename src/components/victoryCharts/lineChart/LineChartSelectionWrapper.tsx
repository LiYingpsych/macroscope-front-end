import React, { useRef } from "react";
import OmitType from "utils/OmitType";

import LineChart, { ILineChartProps, lineChartVariant } from "./LineChart";
import { yCoordType, xCoordType } from "models/ICartesianCoordinate";

import useTabs from "components/tabs/useTabs";
import ITabItem from "components/tabs/ITabItem";
import useResponsiveChart from "../commonHooks/useResponsiveChart";

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
    const rootElement = useRef(null);
    const { responsiveWidth } = useResponsiveChart({
        rootElement
    });

    const { defaultVariant = "default", ...rest } = props;

    const tabs: ILineChartSelectionTabItem[] = [
        {
            id: "default",
            label: "default",
            content: <LineChart width={responsiveWidth} variant={"default"} {...rest} />
        },
        {
            id: "zoomable",
            label: "zoomable",
            content: <LineChart width={responsiveWidth} variant={"zoomable"} {...rest} />
        }
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
        initialTabIndex: getInitialTab()
    });

    return (
        <div ref={rootElement}>
            {tabsComponent}
            {tabPanelsComponent}
        </div>
    );
}
