import React from 'react';
import {List, Image} from 'semantic-ui-react';

const Message = (props) => {
    return (
        <List.Item style={{
            textAlign: props.message.position,
            backgroundColor: props.message.position === 'right' ? '#d0ffcb' : '#e2e2e2'
        }}>
            <List.Content>
                <List.Description>
                    <b>{props.message.username}: </b>{props.message.text}
                </List.Description>
            </List.Content>
        </List.Item>
    );
};

export default Message;