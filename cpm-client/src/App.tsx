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

function App() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className='frame'>
            <div className='headbar'>
                <div className='headbar-logo'><HomeOutlined onClick={() => setCollapsed(!collapsed)}/></div>
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
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NotificationOutlined />
                            <span>Announcement</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <TeamOutlined />
                            <span>Discussion</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <InboxOutlined />
                            <span>Question Box</span>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="frame-content">
                    
                </div>
            </div>
        </div>
      );
}

export default App;
