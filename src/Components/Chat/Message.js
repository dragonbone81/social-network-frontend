import React from 'react';

const Message = (props) => {
    return (
        <div style={{textAlign: 'left'}}>
            {props.firstMessage ?
                <b>{props.message.position === 'left' ? props.message.username + ' :' : null} </b> : null}
            <div className="chat-list-div" style={{
                textAlign: props.message.position,
            }}>
                {props.message.type === 'messages' ?
                    <span className="chat-message-item"
                          style={{backgroundColor: props.message.position === 'right' ? '#d0ffcb' : '#e2e2e2'}}>

                    {props.message.text}
                </span> :
                    <img alt="message" className="message-img" onLoad={props.scrollToBottom} width={300}
                         src={props.message.text}/>
                }
            </div>
        </div>
    );
};

export default Message;