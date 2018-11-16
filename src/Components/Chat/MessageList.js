import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Message from './Message';

class MessageList extends Component {
    state = {
        slice: 20,
    };

    render() {
        return (
            <>
                {/*<div onClick={() => {*/}
                    {/*this.setState({slice: this.state.slice + 20})*/}
                {/*}}>Load More...*/}
                {/*</div>*/}
                {this.props.messages.slice().map((message, index, arr) => {
                    if (message.username === this.props.mainStore.user.username)
                        message.position = 'right';
                    else
                        message.position = 'left';
                    return <Message scrollToBottom={this.props.scrollToBottom}
                                    firstMessage={index !== 0 && message.username !== arr[index - 1].username}
                                    key={index} message={message}/>
                })}
            </>
        )
    }
}

export default inject("mainStore")(observer(MessageList));