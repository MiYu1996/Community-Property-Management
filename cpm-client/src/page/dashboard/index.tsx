import React from 'react';
import {Avatar, Divider} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './Dashboard.css';
import {Link} from "react-router-dom";

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="user-header">
                <div className="user-header-avatar"><Avatar size={64} icon={<UserOutlined />} /></div>
                <div className="user-header-left">
                    <h1 className="greeting">Good Afternoon, John</h1>
                    <div className="user-summary">5-Year Resident of Apartment 403</div>
                </div>
                <div className="user-header-right">
                    <div className="count-header">Notifications</div>
                    <div className="count">3</div>
                </div>
            </div>
            <div className="notifications">
                <div className="following">Following</div>
                <Divider />
                <div className="notification-list">
                    <div className="notification">
                        <div className="poster-avatar"><Avatar size={40} icon={<UserOutlined />} /></div>
                        <div className="notification-summary">
                            <div className="post-summary">
                                <div className="poster-name">Admin</div>
                                <div className="notification-type">&nbsp;published new announcement&nbsp;</div>
                                <Link to="/announcement">COVID-19 Notice</Link>
                            </div>
                            <div className="post-time">Just now</div>
                        </div>
                    </div>
                    <Divider />
                    <div className="notification">
                        <div className="poster-avatar"><Avatar size={40} icon={<UserOutlined />} /></div>
                        <div className="notification-summary">
                            <div className="post-summary">
                                <div className="poster-name">Alex</div>
                                <div className="notification-type">&nbsp;created new discussion&nbsp;</div>
                                <Link to="/discussion">Who wants to order DoorDash together?</Link>
                            </div>
                            <div className="post-time">3-28</div>
                        </div>
                    </div>
                    <Divider />
                    <div className="notification">
                        <div className="poster-avatar"><Avatar size={40} icon={<UserOutlined />} /></div>
                        <div className="notification-summary">
                            <div className="post-summary">
                                <div className="poster-name">Maintenance</div>
                                <div className="notification-type">&nbsp;replied your question&nbsp;</div>
                                <Link to="/question">When will the street light be repaired?</Link>
                            </div>
                            <div className="post-time">3-25</div>
                        </div>
                    </div>
                    <Divider />
                </div>
            </div>

        </div>
    )
}
