import { LoremIpsum } from "lorem-ipsum";

declare global {
    namespace NodeJS {
        interface Global {
            fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
        }
    }
}

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mock = (useJest: boolean, useDelay: boolean = false) => {
    const mockedFetch = async (input: RequestInfo, init?: RequestInit) => {
        if (input instanceof Request) {
            const url = input.url.replace(/^.*\/\/[^/]+/, '')
            const method = input.method
            if (url === "/api/login" && method === "POST") {
                if (useDelay) await mockDelay(1000);
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
            } else if (url === "/api/user/1234" && method === "GET") {
                await mockDelay(1000);
                return new Response(JSON.stringify({
                    type: "resident",
                    avatar: "jsmith.jpg",
                    username: "JSmith",
                    firstName: "John",
                    lastName: "Smith",
                    room: "303",
                    email: "abc@abc.com",
                    phone: {},
                    birthday: 1583884800,
                    moveinDate: 1583884800,
                }), {
                    status: 200
                })
            } else if (url === "/api/discussion" && method === "GET") {
                if (useDelay) await mockDelay(200);
                return new Response(JSON.stringify({
                    discussionIds: ["1", "2", "3", "4", "5", "6"],
                }), {
                    status: 200
                })
            } else if ((url === "/api/discussion/1" || url === "/api/discussion/2" || url === "/api/discussion/3" || url === "/api/discussion/4" || url === "/api/discussion/5" || url === "/api/discussion/6") && method === "GET") {
                if (useDelay) await mockDelay(Math.round(2000 * Math.random()));
                return new Response(JSON.stringify({
                    time: 1583884800,
                    author: "1234",
                    title: lorem.generateSentences(1),
                    body: lorem.generateParagraphs(3),
                    commentIds: ["1", "2", "3", "4"],
                }), {
                    status: 200
                })
            }
        }
        return new Response("", {
            status: 404
        })
    }
    if (useJest) global.fetch = jest.fn().mockImplementation(mockedFetch)
    else window.fetch = mockedFetch
}
