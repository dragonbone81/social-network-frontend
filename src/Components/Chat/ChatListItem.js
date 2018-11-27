import React from 'react';
import {List, Label} from 'semantic-ui-react';

const ChatListItem = (props) => {
    return (
        <List.Item className="test1" active={props.active === props.index} onClick={props.onClick}>
            <List.Content>
                <List.Description>
                    {/*<div className="course-item">*/}
                    {/*<div className="course-list-options" onClick={props.onClick}>*/}
                    <b>{props.chat.chat_name}</b> {props.unreadMessages ?
                    <Label style={{float: 'right'}} horizontal circular
                           color='red'>{props.unreadMessages}</Label> : null}
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