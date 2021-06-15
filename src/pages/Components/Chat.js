import React, { createRef, Fragment } from "react";
import { ChatList, MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Button, Row, Col, Divider, Input, Card, Upload, message } from "antd";
import Myheader from './Myheader'
import Navbar from './Navbar'
import './Chat.css'
import { UploadOutlined } from '@ant-design/icons';

const size = {
    width: document.documentElement.clientWidth,
    hieght: document.documentElement.clientHeight
}
const { TextArea } = Input;
let user_list = [];//一个列表，存储所有的聊天对象
let msg_lists = {};//一个字典，键是聊天对象的名字，值是一个列表，这个列表中存储所有的消息

function onPatientNext() {
    message.success("switch patient.");
    user_list.push({
        avatar: '../../../public/favicon.ico',
        alt: 'Reactjs',
        title: 'new user',
        subtitle: '大夫，帮俺看看',
        date: new Date(),
        // unread: Math.floor(Math.random() * 10),
    });
    msg_lists[user_list[user_list.length-1].title] = [];
}

class DoctorChatWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // user: this.props.user,
            // msgLists: this.props.msgLists,
            sendMsg: "",
            window_size: {
                width: 700,
                height: 600
            },
            file: null,
            imagePreviewUrl: ""
        }
        this.onMsgSend = this.onMsgSend.bind(this);
        this.messagesEnd = createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // this.setState({ msgDataList: this.state.msgLists[this.state.user.title] });
        // this.setState({ msgLists: this.props.msgLists });
        // this.setState({ user: this.props.user });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ user: nextProps.user });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ window_size: { width: window.innerWidth, height: window.innerHeight } });
    }

    onMsgSend() {
        // let list = this.state.msgLists[this.state.user.title];
        // this.state.msgLists[this.state.user.title].push({
        msg_lists[this.state.user.title].push({
            position: 'right',
            type: 'text',
            text: this.state.sendMsg,
            date: new Date(),
        })

        this.setState({ sendMsg: "" });
    }

    onPicSend = (info) => {
        // alert("pic select");
        // e.preventDefault();

        // var reader = new FileReader();
        // var file = e.target.files[0];

        // reader.onloadend = () => {
        //     console.log('文件名为—', file);
        //     console.log('文件结果为—', reader.result);
        //     this.setState({
        //         file: file,
        //         imagePreviewUrl: reader.result
        //     });
        // }
        // reader.readAsDataURL(file)

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }

    render() {
        return (
            <Col style={{
                width: this.state.window_size.width * 0.5,
                height: 600,
                display: 'inline-block',
            }}>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,
                        height: 40,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20
                    }}>
                        {this.state.user == null ? "" : this.state.user.title}
                    </Col>
                </Row>
                <Row>
                    <div style={{
                        width: this.state.window_size.width * 0.5,
                        height: 405,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        overflow: "auto",
                        // backgroundColor: "\t#00BFFF"
                        backgroundColor: "\t#F9F9FF"
                    }}
                        ref={(el) => {
                            this.messagesEnd = el;
                        }}
                    >
                        <MessageList
                            className='message-list'
                            // dataSource={this.state.msgLists[this.state.user.title]}
                            dataSource={msg_lists[this.state.user.title]}
                        />
                    </div>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,
                        height: 25,
                        textAlign: "right",
                        verticalAlign: "right",
                        backgroundColor: "\t#F0F0FF",
                        borderTop: "1px solid #B0B0FF",
                        // borderRight: "1px solid"
                    }}>
                    
                        <Upload name='file'
                            action=""
                            onChange={this.onPicSend}
                            showUploadList={false} >
                            <Button icon={<UploadOutlined />} size="small"></Button>
                        </Upload>
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20
                    }}>

                        <TextArea rows={4} onChange={e => {
                            this.setState({ sendMsg: e.target.value });
                        }}
                            ref={el => (this.inputRef = el)}
                            value={this.state.sendMsg} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.25 - 1,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        backgroundColor: "\t#F9F9FF"
                    }}>
                        <Button type="primary" onClick={this.onMsgSend}>发送</Button>
                    </Col>
                    <Col style={{
                        width: this.state.window_size.width * 0.25 - 1,
                        textAlign: "center",
                        verticalAlign: "middle",
                        fontSize: 20,
                        backgroundColor: "\t#F9F9FF"
                    }}>
                        <Button type="primary" onClick={onPatientNext}>下一位</Button>
                    </Col>
                </Row>
            </Col >
        );
    }
}

class DoctorChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // userList: [],
            // msgLists: {},
            nowChatTgt: null,
            window_size: {
                width: 700,
                height: 600
            }
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // let u_list = [];
        // let m_lists = {};
        for (let i = 0; i < 14; ++i) {
            // u_list.push({
            user_list.push({
                avatar: '../../../public/favicon.ico',
                alt: 'Reactjs',
                title: '用户' + i,
                subtitle: 'What are you doing?',
                date: new Date(),
                // unread: Math.floor(Math.random() * 10),
            });
            let m_list = [];
            for (let i = 0; i < 10; ++i)
                m_list.push({
                    position: 'left',
                    type: 'text',
                    // text: 'hello' + i + u_list[u_list.length - 1].title,
                    text: 'hello' + i + user_list[user_list.length - 1].title,
                    date: new Date()
                });
            // m_lists[u_list[u_list.length - 1].title] = m_list;
            msg_lists[user_list[user_list.length - 1].title] = m_list;
        }
        // this.setState({ userList: u_list });
        // this.setState({ nowChatTgt: u_list[0] });
        this.setState({ nowChatTgt: user_list[0] }); //default target
        // this.setState({ msgLists: m_lists });
    }

    onChangeChatTgt = (e) => {
        this.setState({ nowChatTgt: e });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ user: nextProps.user });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ window_size: { width: window.innerWidth, height: window.innerHeight } });
    }

    render() {
        return (
            <div>
                {/* <Card title="在线诊疗"> */}
                <Row
                    align='middle'
                    justify='center'>
                    <Col style={{
                        width: this.state.window_size.width * 0.2 - 2,
                        height: 600,
                        display: 'inline-block',
                        borderRight: "2px solid #C4C4FF",
                        overflow: "auto"
                    }}>
                        <ChatList
                            className='chat-list'
                            onClick={e => this.onChangeChatTgt(e)}
                            // dataSource={this.state.userList}
                            dataSource={user_list}
                        />
                    </Col>
                    {/* {this.state.userList.length == 0 ? <div>没有已经启动的问诊</div> : <DoctorChatWidget user={this.state.nowChatTgt} msgLists={this.state.msgLists} />} */}
                    {user_list.length == 0 ? <div>没有已经启动的问诊</div> : <DoctorChatWidget user={this.state.nowChatTgt} />}
                    <Col style={{
                        width: this.state.window_size.width * 0.2 - 2,
                        height: 600,
                        display: 'inline-block',
                        borderLeft: "2px solid #C4C4FF",
                        overflow: "auto",
                        textAlign: "center",
                        verticalAlign: "middle",
                        backgroundColor: "\t#F9F9FF"
                    }}>
                        <h1 style={{ textAlign: 'center' }}>用户信息</h1>
                        {this.state.nowChatTgt == null ? "无人" : this.state.nowChatTgt.title}
                    </Col>
                </Row>
                {/* </Card> */}
            </div>
        );
    }
}

class Chatter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Myheader />
                <Navbar />
                <h3 style={{ textAlign: 'center' }}>医生你好，欢迎使用线上问诊功能</h3>
                <DoctorChatView/>
            </div>
        )
    }
}
export default Chatter;