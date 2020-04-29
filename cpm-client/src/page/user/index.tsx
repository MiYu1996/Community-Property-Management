import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './User.css';
import { Avatar } from 'antd';
import { Button } from 'antd';
import { Descriptions, Badge, Radio, Form, Input, PageHeader} from 'antd';
import { UserOutlined } from '@ant-design/icons';


export const User = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('inline');
    const formItemLayout =
        formLayout === 'inline'
        ? {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 14,
            },
            }
        : null;

    return (
        <div className="user">
            <div className="user-left">
                <h1>MY PROFILE</h1>
                <div className="avatar"><Avatar size={128} icon={<UserOutlined />} /></div>
                <div className="upload-photo-btn"><Button type="primary">Upload Photo</Button></div>
            </div>
            <div className="user-right">
                <PageHeader
                className="general-header"
                title="General"
                />
                <Form
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                    layout: formLayout,
                    }}
                    className="upper-form"
                >
                    <div>
                        <Form.Item label="First Name">
                        <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Last Name">
                        <Input placeholder="input placeholder" />
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}

/*
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('inline');

    const formItemLayout =
        formLayout === 'inline'
        ? {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
            }
        : null;

<Layout>
                <div className="user-left">
                    <Sider>
                        <h1>MY PROFILE</h1>
                        <div className="avatar"><Avatar size={64} icon={<UserOutlined />} /></div>
                        <div><Button type="primary">Upload Photo</Button></div>
                    </Sider>
                </div>
                <Layout>
                    <div className="user-right-up">
                        <Content>
                        <div>
                            <Form
                                {...formItemLayout}
                                form={form}
                                initialValues={{
                                layout: formLayout,
                                }}
                            >
                                <Form.Item label="First Name">
                                <Input placeholder="input placeholder" />
                                </Form.Item>
                                <Form.Item label="Last Name">
                                <Input placeholder="input placeholder" />
                                </Form.Item>
                            </Form>
                        </div>
                        </Content>
                    </div>
                </Layout>
            </Layout>
            */