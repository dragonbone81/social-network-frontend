import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Icon, List} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import ChatListItem from './ChatListItem';
import NewChatModal from '../Modals/NewChatModal';
import MessageList from './MessageList';

class Chat extends Component {
    state = {
        chat_name: '',
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
        // this.props.mainStore.postMessage(this.selectedChatID, this.state.message);
        this.props.mainStore.postMessageWS(this.selectedChatID, this.state.message);
        this.setState({message: ''});
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

    refreshUserChats = () => {
        this.props.mainStore.getUsersChats().then((chats) => {
            this.setState({chats: chats});
        });
    };

    componentDidUpdate() {
        this.scrollToBottom();
    }

    chatClicked = (index) => {
        if (index !== this.state.selectedChat) {
            this.setState({selectedChat: index}, this.loadMessages);
            localStorage.setItem("chat", JSON.stringify(index))
        }
        this.setState({message: ''});
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
                <NewChatModal refreshUserChats={this.refreshUserChats} open={this.state.newChatModalOpen}
                              onClose={this.closeNewChatModal}/>
                <div className="chat-div">
                    <div className="chat-sidebar-container">
                        <div className="chat-sidebar" style={{textAlign: 'center'}}>
                            {this.state.chats.length === 0 && !this.props.mainStore.gettingUsersChats ?
                                <div>Create a new Chat</div> :
                                this.props.mainStore.gettingUsersChats ?
                                    <div style={{marginBottom: 45}}>Loading...</div>
                                    :

                                    <List selection verticalAlign='middle' style={{textAlign: 'left'}}>
                                        {this.state.chats.map((chat, index) => {
                                            return <ChatListItem index={index} active={this.state.selectedChat}
                                                                 onClick={() => this.chatClicked(index)} key={index}
                                                                 chat={chat}/>
                                        })}
                                    </List>
                            }
                            <Button icon='plus' onClick={this.openNewChatModal}/>
                        </div>
                    </div>
                    <div className="chat">
                        <>
                            <div>{this.props.mainStore.gettingChatMessages || this.props.mainStore.gettingUsersChats ? 'Loading...' : null}</div>
                            <div>{!this.props.mainStore.gettingUsersChats && this.state.chats.length === 0 ? 'You have no chats :(' : null}</div>
                            <div>{!this.props.mainStore.gettingUsersChats && !this.props.mainStore.gettingChatMessages && this.state.chats.length !== 0 ? this.state.chats[this.state.selectedChat].chat_name : null}</div>
                            {!this.props.mainStore.gettingUsersChats && this.state.chats.length !== 0 ?
                                <div className="chat-inside">
                                    <>
                                        <div className="messages-div">
                                            {this.props.mainStore.gettingChatMessages || this.props.mainStore.gettingUsersChats ?
                                                <div><Icon style={{marginTop: 50}} size="huge" name="spinner" loading/>
                                                </div> : <MessageList messages={this.state.messages}/>}
                                            <div style={{float: "left", clear: "both"}}
                                                 ref={(el) => {
                                                     this.messagesEnd = el;
                                                 }}>
                                            </div>
                                        </div>
                                        <div className="messages-form">
                                            <Form onSubmit={this.submit}>
                                                <Form.Input required type='text' fluid
                                                            placeholder='Type your message...'
                                                            value={this.state.message}
                                                            onChange={({target}) => this.setState({message: target.value})}/>
                                            </Form>
                                        </div>
                                    </>
                                </div> : null}
                        </>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(Chat)));