import React from 'react'
import { render, fireEvent, screen, waitForElement, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
import { reset } from '../controller/App'
import { mock } from './fetchMock'

beforeAll(function () {
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
    mock(true)
});

afterEach(() => {
    reset()
    cleanup()
})

test('successful login', async () => {
    render(<App />)

    const username = screen.getByTestId("username")
    const password = screen.getByTestId("password")
    const checkbox = screen.getByTestId("checkbox")
    const usernameItem = screen.getByTestId("usernameItem")
    const passwordItem = screen.getByTestId("passwordItem")
    const submit = screen.getByTestId("submit")

    await act(async () => {
        fireEvent.click(checkbox)
        fireEvent.change(username, { target: { value: "JSmith" } })
        fireEvent.change(password, { target: { value: "!@#QWErty123" } })
    });

    expect(username).toHaveProperty("value", "JSmith")
    expect(password).toHaveProperty("value", "!@#QWErty123")
    expect(checkbox).toHaveProperty("checked", false)
    expect(usernameItem).toHaveClass("ant-form-item-has-success")
    expect(passwordItem).toHaveClass("ant-form-item-has-success")

    await act(async () => {
        fireEvent.click(submit)
    });

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(location.pathname).toBe("/dashboard");
})


test('unsuccessful login', async () => {
    render(<App />)

    const username = screen.getByTestId("username")
    const password = screen.getByTestId("password")
    const checkbox = screen.getByTestId("checkbox")
    const usernameItem = screen.getByTestId("usernameItem")
    const passwordItem = screen.getByTestId("passwordItem")
    const submit = screen.getByTestId("submit")

    await act(async () => {
        fireEvent.click(checkbox)
        fireEvent.change(username, { target: { value: "Alice" } })
        fireEvent.change(password, { target: { value: "!@#QWErty123" } })
    });
    expect(username).toHaveProperty("value", "Alice")
    expect(password).toHaveProperty("value", "!@#QWErty123")
    expect(checkbox).toHaveProperty("checked", false)
    expect(usernameItem).toHaveClass("ant-form-item-has-success")
    expect(passwordItem).toHaveClass("ant-form-item-has-success")

    await act(async () => {
        fireEvent.click(submit)
    });

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(location.pathname).toBe("/");
})
