import React from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./themes";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import WordAnalysisPage from "./pages/wordAnalysis/WordAnalysisPage";
import PageLayout, { ITabItem } from "./components/layout/PageLayout";

const App: React.FC = () => {
    const mainNavTabs: ITabItem[] = [
        { route: "/wordanalysis", label: "Word analysis", content: <WordAnalysisPage /> },
        { route: "/manual", label: "Manual", content: "Manual!" },
        { route: "/contactus", label: "Contact us", content: "Contact us!" }
    ];

    const defaultTab = mainNavTabs[0];

    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to={defaultTab.route} />} />
                    <Route render={() => <PageLayout tabItems={mainNavTabs} />} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;
