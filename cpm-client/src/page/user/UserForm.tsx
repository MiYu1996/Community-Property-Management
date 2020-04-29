import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Radio } from 'antd';
import './User.css'

export const UserForm = () => {
    const FormLayoutDemo = () => {
        const [form] = Form.useForm();
        const [formLayout, setFormLayout] = useState('horizontal');
    
    
        const formItemLayout =
        formLayout === 'horizontal'
            ? {
                labelCol: {
                span: 4,
                },
                wrapperCol: {
                span: 14,
                },
            }
            : null;
        const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                span: 14,
                offset: 4,
                },
            }
            : null;

        return (
        <div>
            <Form
            {...formItemLayout}
            form={form}
            initialValues={{
                layout: formLayout,
            }}
            >
            <Form.Item label="Form Layout" name="layout">
                <Radio.Group value={formLayout}>
                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                <Radio.Button value="vertical">Vertical</Radio.Button>
                <Radio.Button value="inline">Inline</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Field A">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
                <Button type="primary">Submit</Button>
            </Form.Item>
            </Form>
        </div>
        );
    };
}