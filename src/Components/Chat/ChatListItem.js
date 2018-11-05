import React from 'react';
import {List, Button, Icon} from 'semantic-ui-react';

const ChatListItem = (props) => {
    return (
        <List.Item active={props.active === props.index} onClick={props.onClick}>
            <List.Content>
                <List.Description>
                    {/*<div className="course-item">*/}
                    {/*<div className="course-list-options" onClick={props.onClick}>*/}
                    <b>{props.chat.chat_name}</b>
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*<Button icon*/}
                    {/*color="pink" size="mini">*/}
                    {/*<Icon name="close" onClick={() => console.log('asd')}/>*/}
                    {/*</Button>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </List.Description>
            </List.Content>
        </List.Item>
    );
};

export default ChatListItem;