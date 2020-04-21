import React from 'react';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    NotificationOutlined,
    TeamOutlined,
    InboxOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";

export const LeftMenu = () => {
    const selected = useLocation().pathname.split("/")[1]
    return (
        <div className='leftmenu'>
            <Menu
                selectedKeys={[selected]}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="dashboard">
                    <DashboardOutlined />
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="announcement">
                    <NotificationOutlined />
                    <Link to="/announcement">Announcement</Link>
                </Menu.Item>
                <Menu.Item key="discussion">
                    <TeamOutlined />
                    <Link to="/discussion">Discussion</Link>
                </Menu.Item>
                <Menu.Item key="question">
                    <InboxOutlined />
                    <Link to="/question">Question Box</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}
