import { useEffect, useState, useMemo, useCallback } from 'react';
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { cacheKey$, cacheValue, LinkedCache } from './Caches';
import { share } from 'rxjs/operators';

const initState: GlobalState = {
    isLoggedIn: true,
    token: "",
    expire: 0,
    userId: "",
}

export const globalStore$ = new BehaviorSubject<GlobalState>(initState)

export const reset = () => {
    globalStore$.next(initState)
}

export const useSubcription = <T>(observable: Observable<T>, onNext: (value: T) => void) =>
    useEffect(() => {
        const subscription = observable.subscribe(onNext)
        return () => subscription.unsubscribe()
    }, [])

export const useCache = <T>(lc: LinkedCache<T>) => {
    const [cacheVal, setCacheVal] = useState(() => cacheValue(lc))
    useSubcription<string[]>(cacheKey$(lc.cache$), () => setCacheVal(() => cacheValue(lc)))
    return cacheVal as (key: string) => (T | undefined)
}

export const formatTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleString()
