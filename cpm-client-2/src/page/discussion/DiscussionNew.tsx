import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router'
import { Input, Button, Typography, Divider } from 'antd';

import { useSubcription } from '../../controller/App';
import { discussionPostResponse$, requestDiscussionPost } from '../../controller/Requests';
const { Title } = Typography;

export const DiscussionNew = () => {
    const [newDiscussionId, setNewDiscussionId] = useState("")
    const titleRef = useRef("")
    const bodyRef = useRef("")

    useSubcription(discussionPostResponse$, (response: DiscussionPostResponse) => {
        setNewDiscussionId(response.discussionId)
    })

    if (newDiscussionId.length) {
        return <Redirect to={`/discussion/${newDiscussionId}`} />
    }

    return (
        <div className="discussion">
            <Title>Title</Title>
            <Input onChange={e => titleRef.current = e.currentTarget.value} />
            <Title>Content</Title>
            <Input.TextArea style={{ height: 256 }} onChange={e => bodyRef.current = e.currentTarget.value} />
            <Divider />
            <Button type="primary" children="Submit" onClick={() => requestDiscussionPost(titleRef.current, bodyRef.current)} />
        </div>
    )
}
