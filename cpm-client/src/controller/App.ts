import { BehaviorSubject } from 'rxjs'

export type GlobalState = {
    isLoggedIn: boolean,
    token: string,
    expire: number,
    userId: string,
}

const initState = {
    isLoggedIn: true,
    token: "",
    expire: 0,
    userId: "",
}

export const globalStore$ = new BehaviorSubject<GlobalState>(initState)

export const reset = () => {
    globalStore$.next(initState)
}