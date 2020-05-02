import React from 'react';

import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, NumberOutlined } from '@ant-design/icons'

import './Login.css'

export const SignupForm = () => {
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