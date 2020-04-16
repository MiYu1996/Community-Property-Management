import React, { useState } from 'react';
import { Menu, Avatar } from 'antd';
import {
    DashboardOutlined,
    NotificationOutlined,
    TeamOutlined,
    InboxOutlined,
    HomeOutlined,
    BellOutlined,
    UserOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

function App() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className='frame'>
            <Router>
                <div className='headbar'>
                    <div className='headbar-logo'><HomeOutlined onClick={() => setCollapsed(!collapsed)} /></div>
                    <div className='headbar-name'>Lorem ipsum Apartments</div>
                    <div className='headbar-user'>
                        <div className="headbar-user-bell"><BellOutlined /></div>
                        <div className="headbar-user-avatar"><Avatar icon={<UserOutlined />} /></div>
                        <div className="headbar-user-name">John Smith</div>
                    </div>
                </div>
                <div className="frame-body">
                    <div className={collapsed ? 'leftmenu-shrink' : 'leftmenu'}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={collapsed}
                        >
                            <Menu.Item key="1">
                                <DashboardOutlined />
                                <Link to="/dashboard">Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NotificationOutlined />
                                <Link to="/announcement">Announcement</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <TeamOutlined />
                                <Link to="/discussion">Discussion</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <InboxOutlined />
                                <Link to="/question">Question Box</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="frame-content">
                        <Switch>
                            <Route path="/dashboard">
                                <div> This is Dashboard </div>
                            </Route>
                            <Route path="/announcement">
                                <div> This is Announcement </div>
                            </Route>
                            <Route path="/discussion">
                                <div> This is Discussion Board </div>
                            </Route>
                            <Route path="/question">
                                <div> This is Question Box </div>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
