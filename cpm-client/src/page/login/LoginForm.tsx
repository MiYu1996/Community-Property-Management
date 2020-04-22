import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';

import { Button, Form, Input, Checkbox, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './Login.css'
import { globalStore$ } from '../../controller/App'
import { requestLogin, LoginStatus, LoginResponse, loginStatus$, loginResponse$ } from '../../controller/Login';

type ValidateStatus = "" | "success" | "warning" | "error" | "validating" | undefined

export const LoginForm = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLongTerm, setLongTerm] = useState<boolean>(true)
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const validUsername = /^[a-zA-Z0-9]{4,16}$/.test(username)
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)
    const validSubmit = validUsername && validPassword
    const usernameStatus: ValidateStatus =
        validUsername || !username.length ? "success" : (isSubmitting ? "error" : "warning")
    const usernameHelp = validUsername || !username.length ? null : "4 to 16 letters or numbers"
    const passwordStatus: ValidateStatus =
        validPassword || !password.length ? "success" : (isSubmitting ? "error" : "warning")
    const passwordHelp = validPassword || !password.length ? null : "Invalid Password Format"

    const onUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (isSubmitting) setSubmitting(false)
        setUsername(e.currentTarget.value)
    }, [isSubmitting])

    const onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (isSubmitting) setSubmitting(false)
        setPassword(e.currentTarget.value)
    }, [isSubmitting])

    const onLongtermChange = useCallback((e: CheckboxChangeEvent) => {
        if (isSubmitting) setSubmitting(false)
        setLongTerm(e.target.checked)
    }, [isSubmitting])

    const onLoginSubmit = useCallback(() => {
        setSubmitting(true)
        if (validSubmit) requestLogin(username, password, isLongTerm)
    }, [username, password, isLongTerm, validSubmit])

    const handleStatus = useCallback((status: LoginStatus) => {
        setSubmitting(false)
        switch (status) {
            case 401:
                message.warning('Invalid Username or Password');
                break;
            case 404:
                message.warning('API Not Implemented');
                break;
        }
    }, [])

    const handleResponse = useCallback((response: LoginResponse) => {
        globalStore$.next({
            ...globalStore$.value,
            isLoggedIn: true,
            token: response.token,
            expire: response.expire,
            userId: response.userId,
        })
    }, [])

    useEffect(() => {
        const statusSub = loginStatus$.subscribe(handleStatus)
        const responseSub = loginResponse$.subscribe(handleResponse)
        return () => {
            statusSub.unsubscribe()
            responseSub.unsubscribe()
        }
    }, [handleStatus, handleResponse])

    return (
        <Form
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{ remember: true }}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                validateStatus={usernameStatus}
                help={usernameHelp}
                data-testid="usernameItem" >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    value={username}
                    onChange={onUsernameChange}
                    disabled={isSubmitting && validSubmit}
                    data-testid="username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                validateStatus={passwordStatus}
                help={passwordHelp}
                data-testid="passwordItem" >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChange}
                    disabled={isSubmitting && validSubmit}
                    data-testid="password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox
                    style={{ color: "white", userSelect: "none" }}
                    checked={isLongTerm}
                    onChange={onLongtermChange}
                    disabled={isSubmitting && validSubmit}
                    data-testid="checkbox">
                    Remember me for 2 weeks
                </Checkbox>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={onLoginSubmit}
                    loading={isSubmitting && validSubmit}
                    data-testid="submit">
                    Log In
                </Button>
            </Form.Item>
        </Form>
    )
}