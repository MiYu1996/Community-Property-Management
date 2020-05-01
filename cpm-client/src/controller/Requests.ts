import Hex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import { rxOneToOne, rxPluck, rxPluckResolve, rxFilterOk, rxResponse } from './rx';
import { globalVal } from './App';

//const formatUrl = (url: string) => globalVal().isLoggedIn ? `${globalVal().host}${url}?token=${globalVal().token}&expire=${globalVal().expire}` : `${globalVal().host}${url}`

// for mockFetch
const formatUrl = (url: string) => url

type PostObjParam<T> = {
    param: string,
    body: T,
}

type PostUrlFormatter = {
    format: (url: string, param: string) => string,
    param: string,
    body: any
}

const GET_PURE = (url: string) => new Request(formatUrl(url), { method: 'GET' })
const GET_URL_PARAM = (url: string, param: string) => new Request(`${formatUrl(url)}/${param}`, { method: 'GET' })
const POST_OBJ = (url: string, body: any) => new Request(formatUrl(url), { method: 'POST', body: JSON.stringify(body) })
const POST_URL_PARAM = (url: string, param: PostUrlFormatter) => new Request(formatUrl(param.format(url, param.param)), { method: 'POST', body: JSON.stringify(param.body) })
const POST_REPLY = <T>(url: string, param: PostObjParam<T>) => POST_URL_PARAM(url, { format: (url, param) => `${url}/${param}/reply`, ...param })
const POST_COMMENT = <T>(url: string, param: PostObjParam<T>) => POST_URL_PARAM(url, { format: (url, param) => `${url}/${param}`, ...param })

const [loginSubject, loginFetch$] = rxOneToOne<LoginRequest>("/api/login", POST_OBJ, true)
export const requestLogin = (username: string, password: string, isLongTerm: boolean) => loginSubject.next({
    username: username,
    password: Hex.stringify(sha256(password)),
    isLongTerm: isLongTerm
})
export const loginStatus$ = rxResponse(rxPluck<LoginRequest, LoginStatus>(loginFetch$, "status"))
export const loginResponse$ = rxResponse(rxPluckResolve<LoginRequest, LoginResponse>(rxFilterOk(loginFetch$), "json"))



const [userSubject, userFetch$] = rxOneToOne<UserId>("/api/user", GET_URL_PARAM)
export const requestUser = (id: UserId) => userSubject.next(id)
export const userStatus$ = rxPluck<UserId, UserStatus>(userFetch$, "status")
export const userResponse$ = rxPluckResolve<UserId, User>(rxFilterOk(userFetch$), "json")

const [announcementListSubject, announcementListFetch$] = rxOneToOne("/api/announcement", GET_PURE)
export const requestAnnouncementList = () => announcementListSubject.next()
export const announcementListResponse$ = rxResponse(rxPluckResolve<undefined, AnnouncementList>(rxFilterOk(announcementListFetch$), "json"))

const [announcementSubject, announcementFetch$] = rxOneToOne<AnnouncementId>("/api/announcement", GET_URL_PARAM)
export const requestAnnouncement = (id: AnnouncementId) => announcementSubject.next(id)
export const announcementStatus$ = rxPluck<AnnouncementId, AnnouncementStatus>(announcementFetch$, "status")
export const announcementResponse$ = rxPluckResolve<AnnouncementId, Announcement>(rxFilterOk(announcementFetch$), "json")

const [announcementPostSubject, announcementPostFetch$] = rxOneToOne<AnnouncementPostRequest>("/api/announcement/new", POST_OBJ, true)
export const requestAnnouncementPost = (title: string, body: string) => announcementPostSubject.next({ title, body })
export const announcementPostStatus$ = rxResponse(rxPluck<AnnouncementPostRequest, AnnouncementPostStatus>(announcementPostFetch$, "status"))
export const announcementPostResponse$ = rxResponse(rxPluckResolve<AnnouncementPostRequest, AnnouncementPostResponse>(rxFilterOk(announcementPostFetch$), "json"))

const [discussionListSubject, discussionListFetch$] = rxOneToOne("/api/discussion", GET_PURE)
export const requestDiscussionList = () => discussionListSubject.next()
export const discussionListResponse$ = rxResponse(rxPluckResolve<undefined, DiscussionList>(rxFilterOk(discussionListFetch$), "json"))

const [discussionSubject, discussionFetch$] = rxOneToOne<DiscussionId>("/api/discussion", GET_URL_PARAM)
export const requestDiscussion = (id: DiscussionId) => discussionSubject.next(id)
export const discussionStatus$ = rxPluck<DiscussionId, DiscussionStatus>(discussionFetch$, "status")
export const discussionResponse$ = rxPluckResolve<DiscussionId, Discussion>(rxFilterOk(discussionFetch$), "json")

const [discussionPostSubject, discussionPostFetch$] = rxOneToOne<DiscussionPostRequest>("/api/discussion/new", POST_OBJ, true)
export const requestDiscussionPost = (title: string, body: string) => discussionPostSubject.next({ title, body })
export const discussionPostStatus$ = rxResponse(rxPluck<DiscussionPostRequest, DiscussionPostStatus>(discussionPostFetch$, "status"))
export const discussionPostResponse$ = rxResponse(rxPluckResolve<DiscussionPostRequest, DiscussionPostResponse>(rxFilterOk(discussionPostFetch$), "json"))

const [commentSubject, commentFetch$] = rxOneToOne<CommentId>("/api/comment", GET_URL_PARAM)
export const requestComment = (id: CommentId) => commentSubject.next(id)
export const commentStatus$ = rxPluck<CommentId, CommentStatus>(commentFetch$, "status")
export const commentResponse$ = rxPluckResolve<CommentId, AComment>(rxFilterOk(commentFetch$), "json")

const [commentDiscussionSubject, commentDiscussionFetch$] = rxOneToOne<PostObjParam<CommentPostRequest>>("/api/discussion", POST_COMMENT, true)
export const requestCommentDiscussion = (id: DiscussionId, body: string) => commentDiscussionSubject.next({ param: id, body: { body } })
export const commentDiscussionStatus$ = rxResponse(rxPluck<PostObjParam<CommentPostRequest>, CommentPostStatus>(commentDiscussionFetch$, "status"))
export const commentDiscussionResponse$ = rxResponse(rxPluckResolve<PostObjParam<CommentPostRequest>, CommentPostResponse>(rxFilterOk(commentDiscussionFetch$), "json"))

const [replyQuestionSubject, replyQuestionFetch$] = rxOneToOne<PostObjParam<CommentPostRequest>>("/api/question", POST_REPLY, true)
export const requestReplyQuestion = (id: QuestionId, body: string) => replyQuestionSubject.next({ param: id, body: { body } })
export const replyQuestionStatus$ = rxResponse(rxPluck<PostObjParam<CommentPostRequest>, CommentPostStatus>(replyQuestionFetch$, "status"))
export const replyQuestionResponse$ = rxResponse(rxPluckResolve<PostObjParam<CommentPostRequest>, CommentPostResponse>(rxFilterOk(replyQuestionFetch$), "json"))

const [questionListSubject, questionListFetch$] = rxOneToOne("/api/question", GET_PURE)
export const requestQuestionList = () => questionListSubject.next()
export const questionListResponse$ = rxResponse(rxPluckResolve<undefined, QuestionList>(rxFilterOk(questionListFetch$), "json"))

const [questionSubject, questionFetch$] = rxOneToOne<QuestionId>("/api/question", GET_URL_PARAM)
export const requestQuestion = (id: QuestionId) => questionSubject.next(id)
export const questionStatus$ = rxPluck<QuestionId, QuestionStatus>(questionFetch$, "status")
export const questionResponse$ = rxPluckResolve<QuestionId, Question>(rxFilterOk(questionFetch$), "json")

const [questionPostSubject, questionPostFetch$] = rxOneToOne<QuestionPostRequest>("/api/question", POST_OBJ, true)
export const requestQuestionPost = (title: string, body: string, related: CompanyId[]) => questionPostSubject.next({ title, body, related })
export const questionPostStatus$ = rxResponse(rxPluck<QuestionPostRequest, QuestionPostStatus>(questionPostFetch$, "status"))
export const questionPostResponse$ = rxResponse(rxPluckResolve<QuestionPostRequest, QuestionPostResponse>(rxFilterOk(questionPostFetch$), "json"))

const [companyListSubject, companyListFetch$] = rxOneToOne("/api/company", GET_PURE)
export const requestCompanyList = () => companyListSubject.next()
export const companyListResponse$ = rxResponse(rxPluckResolve<undefined, CompanyList>(rxFilterOk(companyListFetch$), "json"))

const [companySubject, companyFetch$] = rxOneToOne<CompanyId>("/api/company", GET_URL_PARAM)
export const requestCompany = (id: CompanyId) => companySubject.next(id)
export const companyStatus$ = rxPluck<CompanyId, CompanyStatus>(companyFetch$, "status")
export const companyResponse$ = rxPluckResolve<CompanyId, Company>(rxFilterOk(companyFetch$), "json")

const [notificationListSubject, notificationListFetch$] = rxOneToOne("/api/notification", GET_PURE)
export const requestNotificationList = () => notificationListSubject.next()
export const notificationListResponse$ = rxResponse(rxPluckResolve<undefined, NotificationList>(rxFilterOk(notificationListFetch$), "json"))
