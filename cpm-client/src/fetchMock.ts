import { LoginRequest } from './controller/Login'

declare global {
    namespace NodeJS {
        interface Global {
            fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
        }
    }
}

const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mock = (useJest: boolean, useDelay: boolean = false) => {
    const mockedFetch = async (input: RequestInfo, init?: RequestInit) => {
        if (useDelay) await mockDelay(1000);
        if (input instanceof Request) {
            const url = input.url.replace(/^.*\/\/[^\/]+/, '')
            const method = input.method
            if (url === "/api/login" && method === "POST") {
                const body = await input.json() as LoginRequest
                switch (body.username) {
                    case "JSmith":
                        return new Response(JSON.stringify({
                            userId: "1234",
                            token: "qwerty",
                            expire: 1234567890
                        }), {
                            status: 200
                        })
                    default:
                        return new Response("", {
                            status: 401
                        })
                }
            }
        }
        return new Response("", {
            status: 404
        })
    }
    if (useJest) global.fetch = jest.fn().mockImplementation(mockedFetch)
    else window.fetch = mockedFetch
}
