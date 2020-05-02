import React, { useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import './User.css';
import { Avatar } from 'antd';
import { Button } from 'antd';
import { Descriptions, Badge, Radio, Form, Input, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useCache, globalVal } from '../../controller/App';
import { userCache$ } from '../../controller/Caches';


export const User = () => {
    const userCache = useCache(userCache$)
    const [form] = Form.useForm();

    const userForm = useMemo(() => {
        const user = userCache(globalVal().userId)
        if (user) {
            return (
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    className="upper-form"
                >
                    <div>
                        <Form.Item label="User Type">
                            <Input value={user.type} disabled />
                        </Form.Item>
                        <Form.Item label="First Name">
                            <Input value={user.firstName} />
                        </Form.Item>
                        <Form.Item label="Last Name">
                            <Input value={user.lastName} />
                        </Form.Item>
                    </div>
                </Form>
            )
        } else {
            return
        }
    }, [userCache])

    return (
        <div className="user">
            <div className="user-left">
                <h1>MY PROFILE</h1>
                <div className="avatar"><Avatar size={128} icon={<UserOutlined />} /></div>
                <div className="upload-photo-btn"><Button type="primary">Upload Photo</Button></div>
            </div>

            <div className="user-right">
                {userForm}
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