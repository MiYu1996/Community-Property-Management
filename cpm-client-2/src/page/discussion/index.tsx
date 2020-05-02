import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Skeleton, Col, Row } from 'antd'

import './Discussion.css'
import { useSubcription, formatTime, useCache } from '../../controller/App'
import { userCache$, discussionCache$ } from '../../controller/Caches'
import { requestDiscussionList, discussionListResponse$, } from '../../controller/Requests'
import { DiscussionThread } from './DiscussionThread'
import { DiscussionNew } from './DiscussionNew'

export const Discussion = () => {
    const userCache = useCache(userCache$)
    const discussionCache = useCache(discussionCache$)
    const [discussionIdsToShow, setDiscussionIdsToShow] = useState<DiscussionId[]>([])

    useSubcription(discussionListResponse$, (response: DiscussionList) =>
        setDiscussionIdsToShow(response.discussionIds.slice(0, 10))
    )

    useEffect(requestDiscussionList, [])

    const authorName = useCallback((id: UserId) => {
        const user = userCache(id)
        if (user) {
            return <span children={`${user.firstName} ${user.lastName}`} />
        } else {
            return <Skeleton.Button style={{ width: "72px", height: "24px" }} active />
        }
    }, [userCache])

    const listItem = useCallback((id: DiscussionId) => {
        const discussion = discussionCache(id)
        if (discussion) {
            return (
                <Row className="discussion-li" key={id}>
                    <Col span={4} className="discussion-li-replies">
                        <span className="discussion-li-replies-count" children={discussion.commentIds.length} />
                        <span className="discussion-li-replies-label" children={"replies"} />
                    </Col>
                    <Col span={16} className="discussion-li-abbr">
                        <Link to={`/discussion/${id}`}>
                            <div className="discussion-li-title" children={discussion.title} />
                        </Link>
                        <div className="discussion-li-body" children={discussion.body} />
                    </Col>
                    <Col span={4} className="discussion-li-author">
                        <div className="discussion-li-author-name" children={authorName(discussion.author)} />
                        <div className="discussion-li-author-time" children={formatTime(discussion.time)} />
                    </Col>
                </Row>
            )
        } else {
            return <div className="discussion-li" key={id}><Skeleton active /></div>
        }
    }, [discussionCache, authorName])

    const discussionList = useMemo(() => (
        < div className="discussion-list" children={discussionIdsToShow.map(listItem)} />
    ), [discussionIdsToShow, listItem])

    return (
        <Switch>
            <Route exact path={["/discussion"]} >
                <div className="discussion">
                    <Link to="/discussion/new"><div className="discussion-newpost"><span>+ New Post</span></div></Link>
                    {discussionList}
                </div>
            </Route>
            <Route exact path="/discussion/new" component={DiscussionNew} />
            <Route path="/discussion/:id" component={DiscussionThread} />
        </Switch>
    )
}
