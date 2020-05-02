import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Avatar, Divider, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './Dashboard.css';
import { notificationListResponse$, requestNotificationList } from '../../controller/Requests';
import { useSubcription, useCache, formatTime } from '../../controller/App';
import { userCache$ } from '../../controller/Caches';

export const Dashboard = () => {
    const userCache = useCache(userCache$)
    const [notificationsToShow, setNotificationsToShow] = useState<ANotification[]>([])

    useSubcription(notificationListResponse$, (response: NotificationList) =>
        setNotificationsToShow(response.notifications.slice(0, 10))
    )

    useEffect(requestNotificationList, [])

    const listItem = useCallback((notification: ANotification) => {
        const sender = userCache(notification.sender)
        if (sender) {
            return (
                <div className="notification">
                    <div className="poster-avatar"><Avatar size={40} icon={<UserOutlined />} /></div>
                    <div className="notification-summary">
                        <div className="post-summary">
                            <div className="poster-name">{sender.firstName}</div>
                            <div className="notification-type">&nbsp;{notification.body}&nbsp;</div>
                        </div>
                        <div className="post-time">{formatTime(notification.time)}</div>
                    </div>
                </div>
            )
        } else {
            return <Skeleton active />
        }
    }, [userCache, notificationsToShow])

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
                    {notificationsToShow.map(listItem).reduce((r: JSX.Element[], a: JSX.Element) => r.concat(a, (<Divider />)), [])}
                </div>
            </div>

        </div>
    )
}
