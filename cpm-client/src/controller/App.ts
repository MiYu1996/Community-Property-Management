import { BehaviorSubject } from 'rxjs'

export type GlobalState = {
    isLoggedIn: boolean,
    token: string,
    tokenLife: number,
    userId: string,
}

export const globalStore$ = new BehaviorSubject<GlobalState>({
    isLoggedIn: false,
    token: "",
    tokenLife: 0,
    userId: "",
})
