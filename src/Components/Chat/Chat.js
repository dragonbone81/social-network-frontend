import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Icon, List, Message, Input} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import ChatListItem from './ChatListItem';
import NewChatModal from '../Modals/NewChatModal';
import EditChatModal from '../Modals/EditChatModal';
import MessageList from './MessageList';
import GifBox from './GifBox';

class Chat extends Component {
    state = {
        chat_name: '',
        message: '',
        messages: [],
        chats: [],
        selectedChat: 0,
        newChatModalOpen: false,
        editChatModalOpen: false,
        unreadMessages: {},
        typingNotifSent: false,
        chatTimeOut: null,
        // gifTimeOut: null,
        chatType: 'messages',
    };

    get selectedChatID() {
        return this.state.chats.length > 0 ? this.state.chats[this.state.selectedChat].chat_id : -1;
    };

    addMessageToList = (text, username, type) => {
        this.setState({
            messages: [...this.state.messages, {
                text: text,
                position: 'right',
                username: username,
                type: type,
            }]
        });
    };
    submit = () => {
        if (this.state.chatType === 'messages') {
            if (this.state.message === '')
                return;
            this.props.mainStore.typing = false;
            this.props.mainStore.typingChatWS(this.state.chats[this.state.selectedChat].chat_id, false);
            this.setState({typingNotifSent: false});
            clearTimeout(this.state.chatTimeOut);
            this.addMessageToList(this.state.message, this.props.mainStore.user.username, this.state.chatType);
            if (this.props.mainStore.realTime) {
                this.props.mainStore.postMessageWS(this.selectedChatID, this.state.message, this.state.chatType);
            } else {
                this.props.mainStore.postMessage(this.selectedChatID, this.state.message, this.state.chatType);
            }
            this.setState({message: ''});
        } else {
            this.props.mainStore.searchGIFY(this.state.message);
        }
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
        this.setState({unreadMessages: JSON.parse(localStorage.getItem("unreadMessages")) || {}});
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
                    this.joinAllChats();
                }
            });
        });
        this.props.mainStore.socket.on('message', (data) => {
            if (data.chat_id === this.state.chats[this.state.selectedChat].chat_id) {
                data.message.position = 'left';
                this.setState({
                    messages: [...this.state.messages, data.message]
                });
            } else {
                const oldMessageCount = this.state.unreadMessages[data.chat_id] || 0;
                const countObj = {};
                countObj[data.chat_id] = oldMessageCount + 1;
                this.setState({unreadMessages: {...this.state.unreadMessages, ...countObj}});
                localStorage.setItem("unreadMessages", JSON.stringify(this.state.unreadMessages))
            }
            console.log(data, this.state.chats[this.state.selectedChat].chat_id);
        });
        this.props.mainStore.socket.on('typing', (data) => {
            if (data.chat_id === this.state.chats[this.state.selectedChat].chat_id) {
                if (data.isTyping) {
                    this.props.mainStore.othersTyping = true;
                } else {
                    this.props.mainStore.othersTyping = false;
                }
            }
        })
    }

    joinAllChats = () => {
        this.state.chats.forEach((chat) => {
            this.props.mainStore.joinChatWS(chat.chat_id);
        })
    };
    refreshUserChats = () => {
        this.props.mainStore.getUsersChats().then((chats) => {
            this.setState({chats: chats}, () => {
                this.joinAllChats();
            });
        });
    };

    componentDidUpdate() {
        this.scrollToBottom();
    }

    chatClicked = (index) => {
        if (index !== this.state.selectedChat) {
            this.setState({selectedChat: index}, this.loadMessages);
            localStorage.setItem("chat", JSON.stringify(index));
            this.setState({message: ''});

            const copyObj = {...this.state.unreadMessages};
            delete copyObj[this.state.chats[index].chat_id];
            this.setState({unreadMessages: {...copyObj}}, () => {
                localStorage.setItem("unreadMessages", JSON.stringify(this.state.unreadMessages))
            });
        }
    };

    closeNewChatModal = () => {
        this.setState({newChatModalOpen: false})
    };
    openNewChatModal = () => {
        this.setState({newChatModalOpen: true})
    };
    closeEditChatModal = () => {
        this.setState({editChatModalOpen: false})
    };
    openEditChatModal = () => {
        this.setState({editChatModalOpen: true})
    };
    createNewChat = (users, chat_name) => {
        return this.props.mainStore.createChat(users, chat_name);
    };
    editChat = (users, chat_name, chat_id) => {
        return this.props.mainStore.editChat(users, chat_name, chat_id);
    };
    deleteChat = async () => {
        await this.props.mainStore.deleteChat(this.state.chats[this.state.selectedChat].chat_id);
        this.refreshUserChats();
    };


    render() {
        return (
            <div className="chat-container">
                <NewChatModal createNewChat={this.createNewChat} refreshUserChats={this.refreshUserChats}
                              open={this.state.newChatModalOpen}
                              onClose={this.closeNewChatModal}/>
                {this.state.chats.length > 0 ?
                    <EditChatModal deleteChat={this.deleteChat} refreshUserChats={this.refreshUserChats}
                                   editChat={this.editChat} chat={this.state.chats[this.state.selectedChat]}
                                   open={this.state.editChatModalOpen}
                                   onClose={this.closeEditChatModal}/> : null}
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
                                            return <ChatListItem
                                                unreadMessages={this.state.unreadMessages[chat.chat_id]}
                                                index={index} active={this.state.selectedChat}
                                                onClick={() => this.chatClicked(index)} key={index}
                                                chat={chat}/>
                                        })}
                                    </List>
                            }
                        </div>
                        <br/>
                        <Button icon='plus' onClick={this.openNewChatModal}/>
                    </div>
                    <div className="chat">
                        <>
                            <div>{this.props.mainStore.gettingChatMessages || this.props.mainStore.gettingUsersChats ? 'Loading...' : null}</div>
                            <div>{!this.props.mainStore.gettingUsersChats && this.state.chats.length === 0 ? 'You have no chats :(' : null}</div>
                            <div>
                                <h3>{!this.props.mainStore.gettingUsersChats && !this.props.mainStore.gettingChatMessages && this.state.chats.length !== 0 ?
                                    <div>
                                        {this.state.chats[this.state.selectedChat].chat_name}
                                        <Icon onClick={this.openEditChatModal}
                                              style={{paddingLeft: 30, cursor: 'pointer'}} name="edit"/>
                                    </div>
                                    : null}</h3>
                            </div>
                            {!this.props.mainStore.gettingUsersChats && this.state.chats.length !== 0 ?
                                <div className="chat-inside">
                                    <>
                                        <div className="messages-div">
                                            {this.props.mainStore.gettingChatMessages || this.props.mainStore.gettingUsersChats ?
                                                <div><Icon style={{marginTop: 50}} size="huge" name="spinner" loading/>
                                                </div> : <MessageList scrollToBottom={this.scrollToBottom}
                                                                      messages={this.state.messages}/>}
                                            {this.props.mainStore.othersTyping ?
                                                <Message positive icon>
                                                    <Icon name='circle notched' loading/>
                                                    <Message.Content>
                                                        <Message.Header>Someone is typing...</Message.Header>
                                                    </Message.Content>
                                                </Message> : null}
                                            <div style={{float: "left", clear: "both"}}
                                                 ref={(el) => {
                                                     this.messagesEnd = el;
                                                 }}>
                                            </div>
                                        </div>
                                        <div className="messages-form">
                                            <Form onSubmit={this.submit}>
                                                <Input type='text' fluid
                                                       placeholder={this.state.chatType !== 'messages' ? 'Search for GIF...' : 'Type your message...'}
                                                       value={this.state.message}
                                                       label={
                                                           <Button
                                                               onClick={() => {
                                                                   this.state.chatType === 'messages' ? this.setState({chatType: 'gifs'}) : this.setState({chatType: 'messages'});
                                                                   this.setState({message: ''});
                                                                   this.props.mainStore.searchedGIFs = [];
                                                               }}
                                                               type='button' icon
                                                               labelPosition='left'>
                                                               {this.state.chatType !== 'gifs' ?
                                                                   <>
                                                                       <Icon name='picture'/>
                                                                       GIFs
                                                                   </> :
                                                                   <>
                                                                       <Icon name='chat'/>
                                                                       Messages
                                                                   </>
                                                               }
                                                           </Button>
                                                       }
                                                       labelPosition='left'
                                                       onChange={({target}) => {
                                                           this.setState({message: target.value});
                                                           if (this.state.chatType === 'messages') {
                                                               if (!this.state.typingNotifSent) {
                                                                   this.props.mainStore.typing = true;
                                                                   this.props.mainStore.typingChatWS(this.state.chats[this.state.selectedChat].chat_id, true);
                                                                   this.setState({typingNotifSent: true});
                                                               } else {
                                                                   clearTimeout(this.state.chatTimeOut);
                                                               }
                                                               this.setState({
                                                                   chatTimeOut: setTimeout(() => {
                                                                       this.props.mainStore.typing = false;
                                                                       this.props.mainStore.typingChatWS(this.state.chats[this.state.selectedChat].chat_id, false);
                                                                       this.setState({typingNotifSent: false});
                                                                   }, 1000)
                                                               })
                                                           }
                                                           // else {
                                                           //     clearTimeout(this.state.gifTimeOut);
                                                           //     this.setState({
                                                           //         gifTimeOut: setTimeout(() => {
                                                           //             this.submit();
                                                           //         }, 300)
                                                           //     });
                                                           // }
                                                       }}/>
                                            </Form>
                                            {this.state.chatType === 'gifs' ?
                                                <GifBox scrollToBottom={this.scrollToBottom}
                                                        chat_id={this.state.chats[this.state.selectedChat].chat_id}
                                                        socket={this.props.mainStore.socket}
                                                        addMessageToList={this.addMessageToList}/> : null}
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