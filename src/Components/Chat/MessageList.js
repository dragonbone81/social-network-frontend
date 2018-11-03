import React, {Component} from 'react';
import {List} from 'semantic-ui-react';
import {inject, observer} from "mobx-react";
import Message from './Message';

class MessageList extends Component {
    render() {
        return (
            <List selection verticalAlign='middle'>
                {this.props.messages.map((message, index) => {
                    if (message.username === this.props.mainStore.user.username)
                        message.position = 'right';
                    else
                        message.position = 'left';
                    return <Message key={index} message={message}/>
                })}
            </List>
        )
    }
}

export default inject("mainStore")(observer(MessageList));