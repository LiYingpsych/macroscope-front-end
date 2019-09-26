import React from "react";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./themes";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={HomePage} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;
