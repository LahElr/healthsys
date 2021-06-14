import React, { createRef } from "react";
import { ChatList, MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Button, Row, Col, Divider, Input, Card } from "antd";
import Myheader from './Myheader'
import Navbar from './Navbar'
import './Chat.css'

const size = {
    width: document.documentElement.clientWidth,
    hieght: document.documentElement.clientHeight
}
const { TextArea } = Input;

function onPatientNext() {
    alert("switch patient.");
}

class DoctorChatWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            msgLists: this.props.msgLists,
            sendMsg: "",
            window_size: {
                width: 700,
                height: 600
            }
        }
        this.onMsgSend = this.onMsgSend.bind(this);
        this.messagesEnd = createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // this.setState({ msgDataList: this.state.msgLists[this.state.user.title] });
        this.setState({ msgLists: this.props.msgLists });
        this.setState({ user: this.props.user });
        alert("...");
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
        this.state.msgLists[this.state.user.title].push({
            position: 'right',
            type: 'text',
            text: this.state.sendMsg,
            date: new Date(),
        })

        this.setState({ sendMsg: "" });
    }

    onPicSend() {
        alert("pic select");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }
    render() {
        return (
            <Col style={{
                width: this.state.window_size.width * 0.5,
                // width: this.state.window_size.width * 0.617,
                height: 600,
                // height: this.state.window_size.height,
                display: 'inline-block',
                borderRight: "0px solid",
                borderTop: "0px solid",
                borderBottom: "0px solid",
            }}>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5,//700,
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
                            dataSource={this.state.msgLists[this.state.user.title]}
                        />
                    </div>
                </Row>
                <Row>
                    <Col style={{
                        width: this.state.window_size.width * 0.5 - 26,
                        height: 25,
                        textAlign: "right",
                        verticalAlign: "right",
                        backgroundColor: "\t#F0F0FF",
                        borderTop: "1px solid",
                        borderRight: "1px solid"
                    }}>
                    </Col>
                    <Col style={{
                        width: 26,
                        height: 25,
                        textAlign: "right",
                        verticalAlign: "right",
                        backgroundColor: "\t#F0F0FF",
                        borderTop: "1px solid"
                    }}>
                        <Button type="text" size='small' onClick={this.onPicSend}>
                            图
                        </Button>
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
            </Col>
        );
    }
}

class DoctorChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            msgLists: {},
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
        let u_list = [];
        let m_lists = {};
        for (let i = 0; i < 14; ++i) {
            u_list.push({
                avatar: './public/favicon.ico',
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
                    text: 'hello' + i + u_list[u_list.length - 1].title,
                    date: new Date()
                });
            m_lists[u_list[u_list.length - 1].title] = m_list;
        }
        this.setState({ userList: u_list });
        this.setState({ nowChatTgt: u_list[0] });
        this.setState({ msgLists: m_lists });
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
                        borderRight: "2px solid",
                        overflow: "auto"
                    }}>
                        <ChatList
                            className='chat-list'
                            onClick={e => this.onChangeChatTgt(e)}
                            dataSource={this.state.userList} />
                    </Col>
                    {this.state.userList.length == 0 ? <div>没有已经启动的问诊</div> : <DoctorChatWidget user={this.state.nowChatTgt} msgLists={this.state.msgLists} />}
                    <Col style={{
                        width: this.state.window_size.width * 0.2 - 2,
                        height: 600,
                        display: 'inline-block',
                        borderLeft: "2px solid",
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
                {/* <h1 style={{ textAlign: 'center' }}>欢迎使用线上问诊</h1> */}
                <DoctorChatView
                    className='chatter'
                />
            </div>
        )
    }
}
export default Chatter;