import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router'

import { userCache$, discussionCache$, commentCache$, cacheValue } from '../../controller/Caches'
import {
    requestDiscussionList,
    requestDiscussion,
    discussionListResponse$,
    discussionStatus$,
    requestUser,
    requestComment,
} from '../../controller/Requests'
import { useCache, useSubcription } from '../../controller/App';

export const DiscussionThread = (props: RouteComponentProps<{ id: DiscussionId }>) => {
    /*
    const [userCache, userDep] = useCache(userCache$)
    const [discussionCache, discussionDep] = useCache(discussionCache$)
    const [commentCache, commentDep] = useCache(commentCache$)
    const [visibleCommentIds, setVisibleCommentIds] = useState<CommentId[]>([])

    const id = props.match.params.id
    /*
        useEffect(() => {
            if (id in discussionCache()) {
                requestDiscussion(id)
            } else if (discussionCache()[id].author in userCache()) {
                setVisibleCommentIds(discussionCache()[id].commentIds.slice(0, 10))
                requestUser(discussionCache()[id].author)
            }
        }, [])
    
        useSubcription(newDiscussionIds$, (newId: DiscussionId) => {
            if (newId === id)
                discussionCache()[id].commentIds
                    .filter(id => !(id in commentCache))
                    .forEach(requestComment)
        })
    
        useSubcription(newCommentIds$, (newId: CommentId) => {
            if (commentCache()[newId].author in userCache())
                requestUser(commentCache()[newId].author)
        })
    */
    const discussionContent = useMemo(() => (
        <div className="discussion-content">
            <div className="discussion-content-title">

            </div>
            <div className="discussion-content-body">

            </div>
        </div >
    ), [])

    const commentList = useMemo(() => (
        <div className="comment-list">
            <div className="discussion-post-title">

            </div>
        </div >
    ), [])

    return (
        <div className="discussion">
            {discussionContent}
            {commentList}
        </div>
    )
}
