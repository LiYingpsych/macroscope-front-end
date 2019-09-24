import React from "react";
import "./App.css";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme } from './themes';
import { NotFoundPage } from "./NotFoundPage";
import { HomePage } from "./HomePage";

const App: React.FC = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact={true} path="/" component={HomePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
