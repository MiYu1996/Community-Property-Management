import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { HeadBar } from './HeadBar'
import { LeftMenu } from './LeftMenu'
import { Login } from './page/login'
import { Dashboard } from './page/dashboard'
import { Announcement } from './page/announcement'
import { Discussion } from './page/discussion'
import { Question } from './page/question'

import { GlobalState, globalStore$ } from './controller/App'

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const applyState = (state: GlobalState) => {
        console.log("New state: ", state) //DEBUG
        setLoggedIn(state.isLoggedIn)
    }
    useEffect(() => {
        const storeSub = globalStore$.subscribe(applyState)
        return () => {
            storeSub.unsubscribe()
        }
    }, [])

    return (
        <div className='app' data-testid="app">
            <Router>
                <HeadBar />
                <div className="app-body">
                    <Switch>
                        <Route exact path={["/", "/signup"]} children={isLoggedIn ? <Redirect to="/dashboard" /> : <Login />} />
                        {isLoggedIn ? null : <Redirect to="/" />}
                        <div className="app-content">
                            <LeftMenu />
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/announcement" component={Announcement} />
                                <Route path="/discussion" component={Discussion} />
                                <Route path="/question" component={Question} />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </Switch>
                </div>
            </Router>
        </div >
    );
}

export default App;
