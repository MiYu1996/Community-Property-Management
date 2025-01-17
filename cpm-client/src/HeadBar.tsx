import React from 'react';
import { Layout, Avatar } from 'antd';
import { HomeOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import {
    Switch,
    Route,
    Link,
} from "react-router-dom";
const { Header } = Layout;

const headbarLogin = () => {
    return (
        <div className='headbar-login'>
            <Switch>
                <Route exact path="/" component={() => <Link to="/signup">Sign Up</Link>} />
                <Route exact path="/signup" component={() => <Link to="/">Log In</Link>} />
            </Switch>
        </div >
    )
}

const headbarUser = () => {
    return (
        <div className='headbar-user'>
            <div className="headbar-user-bell"><BellOutlined /></div>
            <div className="headbar-user-avatar"><Avatar icon={<UserOutlined />} /></div>
            <Link className="headbar-user-name" to="/user" style={{ color: "white" }}>John Smith</Link>
        </div>
    )
}

export const HeadBar = () => {
    return (
        <Header className="headbar">
            <div className='headbar-logo'><HomeOutlined /></div>
            <div className='headbar-name'>Lorem ipsum Apartments</div>
            <Switch>
                <Route exact path={["/", "/signup"]} component={headbarLogin} />
                <Route path="*" component={headbarUser} />
            </Switch>
        </Header >
    )
}
