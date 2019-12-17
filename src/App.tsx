import React from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import PageLayout, { IPageLayoutTabItem } from "./components/layout/PageLayout";
import muiThemes from "./themes/muiThemes";

import WordAnalysisPage from "./pages/wordAnalysis/WordAnalysisPage";
import ManualPage from "./pages/manual/ManualPage";
import ContactUsPage from "./pages/contactUs/ContactUsPage";
import SafariSupportSnackBar from "./components/snackBars/SafariSupportSnackBar";

const App: React.FC = () => {
    const mainNavTabs: IPageLayoutTabItem[] = [
        { route: "/wordanalysis", label: "Word analysis", content: <WordAnalysisPage /> },
        { route: "/manual", label: "Manual", content: <ManualPage /> },
        { route: "/contactus", label: "Contact us", content: <ContactUsPage /> }
    ];

    const defaultTab = mainNavTabs[0];

    return (
        <MuiThemeProvider theme={muiThemes.defaultTheme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to={defaultTab.route} />} />
                    <Route
                        render={() => <PageLayout deafultTab={defaultTab} tabItems={mainNavTabs} />}
                    />
                </Switch>
            </BrowserRouter>
            <SafariSupportSnackBar />
        </MuiThemeProvider>
    );
};

export default App;
