import { Subject, from, Observable } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { switchMap, tap, filter, map, share, flatMap } from 'rxjs/operators'

export const rxOneToOne = <T = undefined>(url: string, rp: OneToOneRequestProvider, exclusive = false) => {
    const request$ = new Subject<T>()
    const fetch$ = request$.pipe(
        (exclusive ? switchMap : flatMap)(param =>
            fromFetch(rp(url, param))
                .pipe(map(response => [param, response]), tap(p => console.log(p)))),
        share(),
    )
    return [request$, fetch$] as [Subject<T>, Observable<[T, Response]>]
}

type Key<T> = keyof T

type Value<T> = T[Key<T>]

type Async<T> = T extends () => Promise<any> ? T : never

type SubType<Base, Condition> = Pick<Base, {
    [K in keyof Base]: Base[K] extends Condition ? K : never
}[keyof Base]>;

type ExtractAsync<T> = SubType<T, Async<Value<Response>>>

type AsyncResponse = ExtractAsync<Response>

export const rxPluck = <T, F extends Value<Response>>(fetch$: Observable<[T, Response]>, key: Key<Response>) =>
    fetch$.pipe(map(pair => [pair[0], pair[1][key]] as [T, F]))

export const rxPluckResolve = <T, F>(fetch$: Observable<[T, AsyncResponse]>, key: Key<AsyncResponse>) =>
    fetch$.pipe(flatMap(pair =>
        from(pair[1][key]() as Promise<F>)
            .pipe(map(response => [pair[0], response] as [T, F]))), tap(p => console.log(p))) // DEBUG

export const rxFilterOk = <T>(fetch$: Observable<[T, Response]>) => fetch$.pipe(filter(p => p[1].status === 200))

export const rxResponse = <T>(fetch$: Observable<[any, T]>) => fetch$.pipe(map(p => p[1]))
