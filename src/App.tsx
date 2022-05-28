import React from 'react';
import Record from "./Components/Recorder";
import HomePage from "./Components/HomePage/HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './Styles/App.css';
import Info from "./Components/Info/Info";

function App() {
    return (
        <div className="wrapper">
            <header>
                <h1>Speech Emotion Recognition</h1>
                <p>Приложение, созданное с помощью нейронной сети, распознает ваши эмоции</p>
            </header>
            <Router>
                <Switch>
                    <Route exact path='/record'>
                        <Record />
                    </Route>
                    {/*<Route exact path='/'>*/}
                    {/*    <HomePage />*/}
                    {/*</Route>*/}
                    {/*<Route exact path='/info'>*/}
                    {/*    <Info/>*/}
                    {/*</Route>*/}
                </Switch>
            </Router>
        </div>
    );
}

export default React.memo(App);
