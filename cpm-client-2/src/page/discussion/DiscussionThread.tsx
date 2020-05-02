import React, { useState, useCallback, useMemo, useRef } from 'react';
import { RouteComponentProps } from 'react-router'

import { userCache$, discussionCache$, commentCache$ } from '../../controller/Caches'
import { useCache, formatTime, useSubcription } from '../../controller/App';
import { Skeleton } from 'antd';

import { Input, Button, Typography, Divider } from 'antd';
import { requestCommentDiscussion, commentDiscussionResponse$ } from '../../controller/Requests';
const { Title } = Typography;

export const DiscussionThread = (props: RouteComponentProps<{ id: DiscussionId }>) => {
    const userCache = useCache(userCache$)
    const discussionCache = useCache(discussionCache$)
    const commentCache = useCache(commentCache$)
    const bodyRef = useRef("")
    const [commentIdsToShow, setCommentIdsToShow] = useState<CommentId[]>([])

    useSubcription(commentDiscussionResponse$, (response: CommentPostResponse) => {
        discussionCache(discussionId)!.commentIds = [...commentIdsToShow, response.commentId]
        setCommentIdsToShow([...commentIdsToShow, response.commentId])
    })

    const discussionId = props.match.params.id

    const authorInfo = useCallback((id: UserId) => {
        const author = userCache(id)
        if (author) {
            return <div className="discussion-author" children={`${author.firstName} ${author.lastName}`} />
        }
    }, [])

    const discussionContent = useMemo(() => {
        const discussion = discussionCache(discussionId)
        if (discussion) {
            if (!commentIdsToShow.length) setCommentIdsToShow(discussion.commentIds.slice(0, 10))
            return (
                <div className="discussion-content">
                    <div className="discussion-content-title" children={discussion.title} />
                    <div className="discussion-content-body"> {discussion.body}{authorInfo(discussion.author)}</div>
                </div >
            )
        } else {
            return <div className="discussion-content" key={discussionId}><Skeleton active /></div>
        }
    }, [discussionCache])

    const listItem = useCallback((id: CommentId) => {
        const comment = commentCache(id);
        if (comment) {
            return (
                <div className="comment-li">
                    <div className="comment-body" children={comment.body} />
                    {authorInfo(comment.author)}
                </div >
            )
        } else {
            return <div className="-li" key={id}><Skeleton active /></div>
        }
    }, [commentCache])

    const commentList = useMemo(() => (
        <div className="comment-list" children={commentIdsToShow.map(listItem)} />
    ), [commentIdsToShow, listItem])

    return (
        <div className="discussion">
            {discussionContent}
            {commentList}
            <div className="discussion-comment-post">
                <Title>Comment</Title>
                <Input.TextArea style={{ height: 256 }} onChange={e => bodyRef.current = e.currentTarget.value} />
                <Divider />
                <Button type="primary" children="Submit" onClick={() => requestCommentDiscussion(discussionId, bodyRef.current)} />
            </div>
        </div>
    )
}
