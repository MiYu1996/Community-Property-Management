import React, { useState, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router'

import { userCache$, discussionCache$, commentCache$ } from '../../controller/Caches'
import { useCache, formatTime } from '../../controller/App';
import { Skeleton } from 'antd';

export const DiscussionThread = (props: RouteComponentProps<{ id: DiscussionId }>) => {
    const userCache = useCache(userCache$)
    const discussionCache = useCache(discussionCache$)
    const commentCache = useCache(commentCache$)
    const [commentIdsToShow, setCommentIdsToShow] = useState<CommentId[]>([])

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
        </div>
    )
}
