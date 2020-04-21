import React from 'react'
import { render, fireEvent, screen, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
import { LoginRequest } from '../controller/Login'

declare global {
    namespace NodeJS {
        interface Global {
            fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
        }
    }
}

beforeEach(function () {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    global.fetch = jest.fn().mockImplementation(async (input: RequestInfo, init?: RequestInit) => {
        if (input instanceof Request) {
            if (input.url === "/api/login" && input.method === "POST") {
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
        return {}
    });
});

test('successful login', async () => {
    render(<App />)

    const username = screen.getByTestId("username")
    const password = screen.getByTestId("password")
    const checkbox = screen.getByTestId("checkbox")
    const usernameItem = screen.getByTestId("usernameItem")
    const passwordItem = screen.getByTestId("passwordItem")
    const submit = screen.getByTestId("submit")

    fireEvent.click(checkbox)
    fireEvent.change(username, { target: { value: "JSmith" } })
    fireEvent.change(password, { target: { value: "!@#QWErty123" } })
    expect(username).toHaveProperty("value", "JSmith")
    expect(password).toHaveProperty("value", "!@#QWErty123")
    expect(checkbox).toHaveProperty("checked", false)
    expect(usernameItem).toHaveClass("ant-form-item-has-success")
    expect(passwordItem).toHaveClass("ant-form-item-has-success")

    fireEvent.click(submit)
    expect(global.fetch).toHaveBeenCalledTimes(1)

    await waitForElement(() => screen.getByTestId('app'));
    expect(location.pathname).toBe("/dashboard");
})
