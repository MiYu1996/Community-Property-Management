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
import { Login } from './page/Login'
import { Dashboard } from './page/Dashboard'
import { Announcement } from './page/Announcement'
import { Discussion } from './page/Discussion'
import { Question } from './page/Question'

import { GlobalState, globalStore$ } from './controller/App'

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const applyState = (state: GlobalState) => {
        setLoggedIn(state.isLoggedIn)
    }
    useEffect(() => {
        const storeSub = globalStore$.subscribe(applyState)
        return () => {
            storeSub.unsubscribe()
        }
    }, [])

    return (
        <div className='app'>
            <Router>
                <HeadBar />
                <div className="app-body">
                    <div className="app-content">
                        <Switch>
                            <Route exact path={["/", "/signup"]} component={Login}>
                                {isLoggedIn ? <Redirect to="/dashboard" /> : null}
                            </Route>
                            {isLoggedIn ? null : <Redirect to="/" />}
                            <LeftMenu />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/announcement" component={Announcement} />
                            <Route path="/discussion" component={Discussion} />
                            <Route path="/question" component={Question} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div >
    );
}

export default App;
