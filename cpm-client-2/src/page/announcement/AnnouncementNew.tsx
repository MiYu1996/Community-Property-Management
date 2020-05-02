import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router'
import { Input, Button, Typography, Divider } from 'antd';

import { useSubcription } from '../../controller/App';
import { announcementPostResponse$, requestAnnouncementPost } from '../../controller/Requests';
const { Title } = Typography;

export const AnnouncementNew = () => {
    const [newAnnouncementId, setNewAnnouncementId] = useState("")
    const titleRef = useRef("")
    const bodyRef = useRef("")

    useSubcription(announcementPostResponse$, (response: AnnouncementPostResponse) => {
        setNewAnnouncementId(response.announcementId)
    })

    if (newAnnouncementId.length) return <Redirect to={'/announcement/'} />

    return (
        <div className="announcement-new">
            <Title>Title</Title>
            <Input onChange={e => titleRef.current = e.currentTarget.value} />
            <Title>Content</Title>
            <Input.TextArea style={{ height: 256 }} onChange={e => bodyRef.current = e.currentTarget.value} />
            <Divider />
            <Button type="primary" children="Submit" onClick={() => requestAnnouncementPost(titleRef.current, bodyRef.current)} />
        </div>
    )
}
