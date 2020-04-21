import React, { CSSProperties, useState, ChangeEvent, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

import { Button, Form, Input, Checkbox, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UserOutlined, LockOutlined, NumberOutlined } from '@ant-design/icons'

import './Login.css'
import Background from '../asset/login_background.jpg';
import { globalStore$ } from '../controller/App'
import { requestLogin, LoginStatus, LoginResponse, loginStatus$, loginResponse$ } from '../controller/Login';

const loginBackground: CSSProperties = {
    backgroundImage: `url(${Background})`,
}

type ValidateStatus = "" | "success" | "warning" | "error" | "validating" | undefined

const LoginForm = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLongTerm, setLongTerm] = useState<boolean>(true)
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const handleStatus = (status: LoginStatus) => {
        setSubmitting(false)
        switch (status) {
            case 401:
                message.warning('Invalid Username or Password');
                break;
            case 404:
                message.warning('API Not Implemented');
                break;
        }
    }
    const handleResponse = (response: LoginResponse) => {
        globalStore$.next({
            ...globalStore$.value,
            isLoggedIn: true,
            token: response.token,
            tokenLife: response.life,
            userId: response.userId,
        })
    }
    useEffect(() => {
        const statusSub = loginStatus$.subscribe(handleStatus)
        const responseSub = loginResponse$.subscribe(handleResponse)
        return () => {
            statusSub.unsubscribe()
            responseSub.unsubscribe()
        }
    }, [])

    const validUsername = /^[a-zA-Z0-9]{4,16}$/.test(username)
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password)
    const validSubmit = validUsername && validPassword
    var usernameStatus: ValidateStatus =
        validUsername || !username.length ? "success" : (isSubmitting ? "error" : "warning")
    const usernameHelp = validUsername || !username.length ? null : "4 to 16 letters or numbers"
    var passwordStatus: ValidateStatus =
        validPassword || !password.length ? "success" : (isSubmitting ? "error" : "warning")
    const passwordHelp = validPassword || !password.length ? null : "Invalid Password Format"

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isSubmitting) setSubmitting(false)
        setUsername(e.currentTarget.value)
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isSubmitting) setSubmitting(false)
        setPassword(e.currentTarget.value)
    }

    const onLongtermChange = (e: CheckboxChangeEvent) => {
        if (isSubmitting) setSubmitting(false)
        setLongTerm(e.target.checked)
    }

    const onLoginSubmit = () => {
        setSubmitting(true)
        if (validSubmit) requestLogin(username, password, isLongTerm)
    }
    /*
    const validLoginBody = {}
    const login$ = new Subject<LoginBody>()
    const loginResponse$ = login$.pipe(
        flatMap(body => fromFetch(new Request('/api/login', { method: 'POST', body: JSON.stringify(body) })))
    )
    */
    return (
        <Form
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{ remember: true }}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                validateStatus={usernameStatus}
                help={usernameHelp} >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    value={username}
                    onChange={onUsernameChange}
                    disabled={isSubmitting && validSubmit} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                validateStatus={passwordStatus}
                help={passwordHelp} >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChange}
                    disabled={isSubmitting && validSubmit} />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox
                    style={{ color: "white", userSelect: "none" }}
                    checked={isLongTerm}
                    onChange={onLongtermChange}
                    disabled={isSubmitting && validSubmit}>
                    Remember me for 2 weeks
                </Checkbox>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={onLoginSubmit}
                    loading={isSubmitting && validSubmit}>
                    Log In
                </Button>
            </Form.Item>
        </Form>
    )
}

const SignupForm = () => {
    return (
        <Form
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{ remember: true }}
        >
            <Form.Item
                name="code"
                rules={[{ required: true, message: 'Please input your resident code!' }]}
            >
                <Input placeholder="Resident Code" prefix={<NumberOutlined />} />
            </Form.Item>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item
                name="repassword"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
                <Input.Password placeholder="Confirm Password" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Button type="primary" htmlType="submit" block>Sign Up</Button>
            </Form.Item>
        </Form>
    )
}

export const Login = () => {
    return (
        <div className="login" style={loginBackground}>
            <div className="login-left">
                <Switch>
                    <Route exact path="/">
                        <h1>Welcome Home</h1>
                        <p>Some slogan goes here asjkoasdh oasdioasjdkoaj iojasiopdj asiopdjiopasjdopas iopasj</p>
                    </Route>
                    <Route path="/signup">
                        <h1>This is your new home</h1>
                        <p>Thank you for choosing us asjkoasdh oasdioasjdkoaj iojasiopdj asiopdjiopasjdopas iopasj</p>
                    </Route>
                </Switch>
            </div>
            <div className="login-right">
                <div className="login-form">
                    <Switch>
                        <Route exact path="/" component={LoginForm} />
                        <Route path="/signup" component={SignupForm} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
