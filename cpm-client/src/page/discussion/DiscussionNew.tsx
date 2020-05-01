import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { RouteComponentProps } from 'react-router'


export const DiscussionNew = () => {

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
