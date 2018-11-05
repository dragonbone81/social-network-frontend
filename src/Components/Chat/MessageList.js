import React, {Component} from 'react';
import {List} from 'semantic-ui-react';
import {inject, observer} from "mobx-react";
import Message from './Message';

class MessageList extends Component {
    render() {
        return (
            <div>
                {this.props.messages.map((message, index, arr) => {
                    if (message.username === this.props.mainStore.user.username)
                        message.position = 'right';
                    else
                        message.position = 'left';
                    return <Message firstMessage={index !== 0 && message.username !== arr[index - 1].username}
                                    key={index} message={message}/>
                })}
            </div>
        )
    }
}

export default inject("mainStore")(observer(MessageList));