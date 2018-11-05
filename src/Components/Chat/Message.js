import React from 'react';
import {List, Image} from 'semantic-ui-react';

const Message = (props) => {
    return (
        <div style={{textAlign: 'left'}}>
            {props.firstMessage ?
                <b>{props.message.position === 'left' ? props.message.username + ' :' : null} </b> : null}
            <div className="chat-list-div" style={{
                textAlign: props.message.position,
            }}>
                <span className="chat-message-item"
                      style={{backgroundColor: props.message.position === 'right' ? '#d0ffcb' : '#e2e2e2'}}>
                {props.message.text}
                </span>
            </div>
        </div>
    );
};

export default Message;