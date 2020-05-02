
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, distinct } from "rxjs/operators";
import {
    userResponse$,
    announcementResponse$,
    discussionResponse$,
    commentResponse$,
    questionResponse$,
    companyResponse$,
    requestUser,
    requestAnnouncement,
    requestDiscussion,
    requestComment,
    requestQuestion,
    requestCompany
} from "./Requests";

type CacheableRequestResponsePair<T> = {
    request: (id: string) => void,
    response$: Observable<[string, T]>,
}

export type LinkedCache<T> = {
    cache$: BehaviorSubject<CacheValue<T>>,
    source: CacheableRequestResponsePair<T>,
    request: (id: string) => void,
}

const makeCache = <T>() => new BehaviorSubject<CacheValue<T>>({})

const linkCache = <T>(cache$: BehaviorSubject<CacheValue<T>>, source: CacheableRequestResponsePair<T>) => {
    source.response$.subscribe(pair => cache$.next({ ...cache$.value, [pair[0]]: pair[1] }))
    const requestSubject = new Subject<string>()
    requestSubject.pipe(distinct()).subscribe(source.request)
    const request = (key: string) => requestSubject.next(key)
    return { cache$, source, request } as LinkedCache<T>
}

export const cacheValue = <T>(lc: LinkedCache<T>) =>
    (key: string) => {
        if (key in lc.cache$.value) return lc.cache$.value[key]
        lc.request(key)
        return undefined
    }

export const cacheKey$ = (cache$: BehaviorSubject<CacheValue<any>>) => cache$.pipe(map(Object.keys))

export const userCache$ = linkCache(makeCache<User>(), { request: requestUser, response$: userResponse$ })
export const announcementCache$ = linkCache(makeCache<Announcement>(), { request: requestAnnouncement, response$: announcementResponse$ })
export const discussionCache$ = linkCache(makeCache<Discussion>(), { request: requestDiscussion, response$: discussionResponse$ })
export const commentCache$ = linkCache(makeCache<AComment>(), { request: requestComment, response$: commentResponse$ })
export const questionCache$ = linkCache(makeCache<Question>(), { request: requestQuestion, response$: questionResponse$ })
export const companyCache$ = linkCache(makeCache<Company>(), { request: requestCompany, response$: companyResponse$ })
