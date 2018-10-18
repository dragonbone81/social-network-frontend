import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import Message from './Message';


class Chat extends Component {
    state = {
        chat_name: 'test Chat',
        message: '',
        messages: [
            {
                text: 'hello',
                position: 'left',
            },
            {
                text: 'hi',
                position: 'left',
            },
            {
                text: 'yo',
                position: 'left',
            },
        ],
    };
    submit = () => {
        console.log('submit');
        this.setState({
            messages: [...this.state.messages, {text: this.state.message, position: 'right'}]
        });
        this.state.message = '';
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chat-div">
                    <div>{this.state.chat_name}</div>
                    <div className="messages-div">
                        <List selection verticalAlign='middle'>
                            {this.state.messages.map((message, index) => {
                                return <Message key={index} message={message}/>
                            })}
                        </List>
                        <div style={{float: "left", clear: "both"}}
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
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(Chat)));