import React, { useState, useCallback, useMemo, useEffect} from 'react';
import { Divider, Skeleton } from 'antd';

import './Announcement.css'
import { useCache, useSubcription, formatTime} from '../../controller/App';
import { announcementCache$ } from '../../controller/Caches';
import { announcementListResponse$, requestAnnouncementList } from '../../controller/Requests';
import { Switch, Route } from 'react-router';
import { AnnouncementNew } from './AnnouncementNew';
import { Link } from 'react-router-dom';


export const Announcement = () => {
    const [announcementIdsToShow, setAnnouncementIdsToShow] = useState<AnnouncementId[]>([])
    const announcementCache = useCache(announcementCache$)

    useSubcription(announcementListResponse$, (response: AnnouncementList) =>
        setAnnouncementIdsToShow(response.announcementIds.slice(0, 10))
    )

    useEffect(requestAnnouncementList, [])

    const listItem = useCallback((id: DiscussionId) => {
        const announcement = announcementCache(id)
        if (announcement) {
            return (
                <div className="announcement-post">
                    <h1>{announcement.title}</h1>
                    <Divider />
                    <p>{announcement.body}</p>
                    <Divider/>
                    <p>{formatTime(announcement.time)}</p>
                </div>
            )
        } else {
            return <div className="announcement-post" key={id}><Skeleton active /></div>
        }
    }, [announcementCache])

    const announcementList = useMemo(() => {
        const list = announcementIdsToShow.map(listItem)
        list.unshift(<Link to="/announcement/new"><div className="announcement-newpost"><span>+ New Announcement</span></div></Link>)
        return < div className="announcement" children={list} />
    }, [announcementIdsToShow, listItem])

    return (
        <Switch>
            <Route exact path="/announcement" children={announcementList} />
            <Route exact path="/announcement/new" component={AnnouncementNew} />
        </Switch>
    )
}
