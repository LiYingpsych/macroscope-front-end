import React from "react";
import "./App.css";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { theme } from './themes';
import { NotFoundPage } from "./NotFoundPage";
import { HomePage } from "./HomePage";

const App: React.FC = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};

export default App;
