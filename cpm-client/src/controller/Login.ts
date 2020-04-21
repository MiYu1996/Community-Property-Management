import { Subject, from } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { flatMap, switchMap, tap, filter, map } from 'rxjs/operators'

import Hex from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';

type LoginRequest = {
    username: string,
    password: string,
    isLongTerm: boolean
}

export type LoginResponse = {
    userId: string,
    token: string,
    life: number
}

export type LoginStatus = 200 | 401 | 404

const loginRequest$ = new Subject<LoginRequest>()
const loginFetch$ = loginRequest$.pipe(
    tap(console.log), // DEBUG
    flatMap(body =>
        fromFetch(new Request('/api/login', { method: 'POST', body: JSON.stringify(body) }))
    )
)

export const loginStatus$ = loginFetch$.pipe(
    map(response => response.status as LoginStatus)
)

export const loginResponse$ = loginRequest$.pipe(
    flatMap(body =>
        fromFetch(new Request('/api/login', { method: 'POST', body: JSON.stringify(body) }))
    ),
    filter(response => response.status === 200),
    switchMap(response => from(response.json() as Promise<LoginResponse>))
)

export const requestLogin = (username: string, password: string, isLongTerm: boolean) => {
    loginRequest$.next({
        username: username,
        password: Hex.stringify(sha256(password)),
        isLongTerm: isLongTerm
    })
}
