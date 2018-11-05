import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Icon, List, Image} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import Message from './Message';
import ChatListItem from './ChatListItem';
import NewChatModal from '../Modals/NewChatModal';
import MessageList from './MessageList';


class Chat extends Component {
    state = {
        chat_name: 'test Chat',
        message: '',
        messages: [],
        chats: [],
        selectedChat: 0,
        newChatModalOpen: false,
    };

    get selectedChatID() {
        return this.state.chats.length > 0 ? this.state.chats[this.state.selectedChat].chat_id : -1;
    };

    submit = () => {
        this.setState({
            messages: [...this.state.messages, {
                text: this.state.message,
                position: 'right',
                username: this.props.mainStore.user.username
            }]
        });
        this.props.mainStore.postMessage(this.selectedChatID, this.state.message);
        this.state.message = '';
    };

    loadMessages = () => {
        this.props.mainStore.getMessages(this.selectedChatID).then((messages) => {
            this.setState({messages: messages});
        });
    };

    scrollToBottom = () => {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView();
    };

    componentDidMount() {
        if (!this.props.mainStore.user.username)
            this.props.history.push('/login');
        this.scrollToBottom();
        this.props.mainStore.getUsersChats().then((chats) => {
            this.setState({chats: chats}, () => {
                if (chats.length !== 0) {
                    const oldChatNumber = JSON.parse(localStorage.getItem("chat"));
                    if (oldChatNumber && oldChatNumber <= chats.length - 1) {
                        this.setState({selectedChat: oldChatNumber}, this.loadMessages);
                    } else {
                        this.loadMessages();
                    }
                }
            });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    chatClicked = (index) => {
        if (index !== this.state.selectedChat) {
            this.setState({selectedChat: index}, this.loadMessages);
            localStorage.setItem("chat", JSON.stringify(index))
        }
    };

    closeNewChatModal = () => {
        this.setState({newChatModalOpen: false})
    };
    openNewChatModal = () => {
        this.setState({newChatModalOpen: true})
    };

    render() {
        return (
            <div className="chat-container">
                <NewChatModal open={this.state.newChatModalOpen} onClose={this.closeNewChatModal}/>
                <div className="chat-div">
                    <div className="chat-sidebar-container">
                        <div className="chat-sidebar">
                            {this.props.mainStore.gettingUsersChats ?
                                <div>Loading...</div>
                                :
                                <div style={{textAlign: 'center'}}>
                                    <List selection verticalAlign='middle' style={{textAlign: 'left'}}>
                                        {this.state.chats.map((chat, index) => {
                                            return <ChatListItem index={index} active={this.state.selectedChat} onClick={() => this.chatClicked(index)} key={index}
                                                                 chat={chat}/>
                                        })}
                                    </List>
                                    <Button icon='plus' onClick={this.openNewChatModal}/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="chat">
                        <div>{this.state.chats.length > 0 ? this.state.chats[this.state.selectedChat].chat_name : 'Loading...'}</div>
                        {this.props.mainStore.gettingChatMessages ?
                            <div>Loading...</div>
                            :
                            <div className="chat-inside">
                                <div className="messages-div">
                                    <MessageList messages={this.state.messages}/>
                                    < div style={{float: "left", clear: "both"}}
                                          ref={(el) => {
                                              this.messagesEnd = el;
                                          }}>
                                    </div>
                                </div>
                                <div className="messages-form">
                                    <Form onSubmit={this.submit}>
                                        <Form.Input required type='text' fluid placeholder='Type your message...'
                                                    value={this.state.message}
                                                    onChange={({target}) => this.setState({message: target.value})}/>
                                    </Form>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(Chat)));