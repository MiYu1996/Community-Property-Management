import React, { useState, CSSProperties } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom";
import './login.css'
import Background from './login_background.jpg';
import { Button, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, NumberOutlined } from '@ant-design/icons'

const loginBackground: CSSProperties = {
    backgroundImage: `url(${Background})`,
}

const loginForm = () => {
    return (
        <Form
            wrapperCol={{ span: 24 }}
            name="basic"
            initialValues={{ remember: true }}
        >
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

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox style={{ color: "white", userSelect: "none" }}>Remember me for 2 weeks</Checkbox>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
                <Button type="primary" htmlType="submit" block>Log In</Button>
            </Form.Item>
        </Form>
    )
}

const signupForm = () => {
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
                        <Route exact path="/" component={loginForm} />
                        <Route path="/signup" component={signupForm} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
