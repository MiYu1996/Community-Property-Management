import React, { useState } from 'react';
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
import { Login } from './login'
import { Dashboard } from './dashboard'
import { Announcement } from './announcement'
import { Discussion } from './discussion'
import { Question } from './question'

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false)

    return (
        <div className='app'>
            <Router>
                <HeadBar />
                <div className="app-body">
                    <div className="app-content">
                        <Switch>
                            <Route exact path={["/", "/signup"]}>
                                {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
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
