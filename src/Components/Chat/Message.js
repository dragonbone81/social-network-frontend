import React from 'react';
import {List, Image} from 'semantic-ui-react';

const Message = (props) => {
    return (
        <List.Item style={{textAlign: props.message.position}}>
            <Image avatar src='/images/avatar/small/helen.jpg'/>
            <List.Content>
                {props.message.text}
            </List.Content>
        </List.Item>
    );
};

export default Message;