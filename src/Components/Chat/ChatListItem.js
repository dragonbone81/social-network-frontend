import React from 'react';
import {List, Image} from 'semantic-ui-react';

const ChatListItem = (props) => {
    return (
        <List.Item onClick={props.onClick}>
            <List.Content>
                <List.Description>
                    <b>{props.chat.chat_name}</b>
                </List.Description>
            </List.Content>
        </List.Item>
    );
};

export default ChatListItem;