import React, { CSSProperties, useState, useCallback, useMemo, useEffect } from 'react';
import { Divider, Skeleton } from 'antd';

import './Announcement.css'
import { useCache, useSubcription } from '../../controller/App';
import { announcementCache$ } from '../../controller/Caches';
import { announcementListResponse$, requestAnnouncementList } from '../../controller/Requests';

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
                </div>
            )
        } else {
            return <div className="announcement-post" key={id}><Skeleton active /></div>
        }
    }, [announcementCache])

    const announcementList = useMemo(() => (
        < div className="announcement" children={announcementIdsToShow.map(listItem)} />
    ), [announcementIdsToShow, listItem])

    return announcementList
}
