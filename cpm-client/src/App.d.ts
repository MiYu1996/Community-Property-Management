type OneToOneRequestProvider = (url: string, param?: any) => Request

type GlobalState = {
    host: string,
    isLoggedIn: boolean,
    token: string,
    expire: number,
    userId: UserId,
}

type UserId = string
type AnnouncementId = string
type DiscussionId = string
type QuestionId = string
type CommentId = string
type CompanyId = string

type CacheValue<T> = {
    [id: string]: T
}

/* Login */

type LoginRequest = {
    username: string,
    password: string,
    isLongTerm: boolean
}

type LoginStatus = 200 | 401 | 404

type LoginResponse = {
    userId: UserId,
    token: string,
    expire: number
}

/* User */

type UserStatus = 200 | 404

type User = {
    type: string,
    avatar: string,
    firstName: string,
    lastName: string,
}

type Resident = {
    type: "resident",
    avatar: string,
    username: string,
    firstName: string,
    lastName: string,
    room: string,
    email: string,
    phone: { [key: string]: string },
    birthday: number,
    moveinDate: number,
}


type Staff = {
    type: "staff",
    avatar: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: { [key: string]: string },
    companyId: CompanyId,
}

/* Announcement */
type AnnouncementList = {
    announcementIds: AnnouncementId[]
}

type AnnouncementStatus = 200 | 404

type Announcement = {
    time: number,
    author: UserId,
    title: string,
    body: string,
}

type AnnouncementPostStatus = 200 | 403

type AnnouncementPostRequest = {
    title: string,
    body: string,
}

type AnnouncementPostResponse = {
    announcementId: AnnouncementId,
}

/* Discussion */

type DiscussionList = {
    discussionIds: DiscussionId[]
}

type DiscussionStatus = 200 | 404

type Discussion = {
    time: number,
    author: UserId,
    title: string,
    body: string,
    commentIds: CommentId[],
}

type DiscussionPostStatus = 200 | 403

type DiscussionPostRequest = {
    title: string,
    body: string,
}

type DiscussionPostResponse = {
    discussionId: DiscussionId,
}

/* Comment */

type CommentStatus = 200 | 403 | 404

declare type AComment = {
    time: number,
    author: UserId,
    body: string
}

type CommentPostRequest = {
    body: string,
}

type CommentPostStatus = 200 | 403 | 404

type CommentPostResponse = {
    commentId: CommentId,
}

/* Question */

type QuestionList = {
    questionIds: QuestionId[]
}

type QuestionStatus = 200 | 404

type Question = {
    time: number,
    author: UserId,
    title: string,
    body: string,
    commentIds: CommentId[],
    related: CompanyId[],
    isSolved: boolean,
}

type QuestionPostStatus = 200 | 403

type QuestionPostRequest = {
    title: string,
    body: string,
    related: CompanyId[],
}

type QuestionPostResponse = {
    questionId: QuestionId,
}

/* Company */

type CompanyList = {
    companyIds: CompanyId[]
}

type CompanyStatus = 200 | 404

type Company = {
    type: string,
    name: string,
    staff: UserId[],
}

/* Notification */

type ANotification = {
    time: number,
    sender: UserId,
    body: any,
}

type NotificationList = {
    notifications: ANotification[]
}
