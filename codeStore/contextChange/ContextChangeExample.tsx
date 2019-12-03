import React from "react";

import PageContent from "../../components/layout/PageContent";
import ChangeBarChart from "../../components/victoryCharts/changeBarChart/ChangeBarChart";

export default function ManualPage() {
    return (
        <PageContent>
            <ChangeBarChart
                increasingData={[
                    { label: "i hello", length: 3 },
                    { label: "i you", length: 1 },
                    { label: "i there", length: 2 },
                ]}
                decreasingData={[
                    { label: "d hello", length: -3 },
                    { label: "d there", length: -2 },
                    { label: "d you", length: 1 }
                ]}
            />
        </PageContent>
    );
}
