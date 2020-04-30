import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
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
import { User } from './page/user'


import { globalStore$ } from './controller/App'

const { Content } = Layout;

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
            <Layout>
                <Router>
                    <HeadBar />
                    <Switch>
                        <Route exact path={["/", "/signup"]} />
                        <LeftMenu />
                    </Switch>
                    <Content className="app-body">
                        <Switch>
                            <Route exact path={["/", "/signup"]} children={isLoggedIn ? <Redirect to="/dashboard" /> : <Login />} />
                            {isLoggedIn ? null : <Redirect to="/" />}
                            <div className="app-content">
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard} />
                                    <Route path="/announcement" component={Announcement} />
                                    <Route path="/discussion" component={Discussion} />
                                    <Route path="/question" component={Question} />
                                    <Route path="/user" component={User} />
                                    <Redirect to="/" />
                                </Switch>
                            </div>
                        </Switch>
                    </Content>
                </Router>
            </Layout>
        </div >
    );
}

export default App;
