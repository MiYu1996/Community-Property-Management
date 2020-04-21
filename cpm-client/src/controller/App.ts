import { BehaviorSubject } from 'rxjs'

export type GlobalState = {
    isLoggedIn: boolean,
    token: string,
    expire: number,
    userId: string,
}

export const globalStore$ = new BehaviorSubject<GlobalState>({
    isLoggedIn: false,
    token: "",
    expire: 0,
    userId: "",
})
