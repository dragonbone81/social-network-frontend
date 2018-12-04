import React, {Component} from 'react';
import {Menu, Button} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

class NavBar extends Component {
    render() {
        const activeItem = this.props.location.pathname;
        return (
            <div className="nav-bar">
                <Menu>
                    <Menu.Item header>CSE111</Menu.Item>
                    <Menu.Item
                        name='/chat'
                        active={activeItem === '/chat'}
                        onClick={() => this.props.history.push('/chat')}
                    />
                    <Menu.Item
                        name='/feed'
                        active={activeItem === '/feed'}
                        onClick={() => this.props.history.push('/feed')}
                    />
                    <Menu.Item
                        name='/groups'
                        active={activeItem === '/groups'}
                        onClick={() => this.props.history.push('/groups')}
                    />
                    <Menu.Item
                        name='/register'
                        active={activeItem === '/register'}
                        onClick={() => this.props.history.push('/register')}
                    />
                    {!!this.props.mainStore.user.token ?
                        <Menu.Item name='logout'
                                   onClick={() => {
                                       console.log('asd');
                                       localStorage.clear();
                                       this.props.mainStore.user = {};
                                       this.props.history.push('/login');
                                   }}/> :
                        <Menu.Item name='/login' active={activeItem === '/login'}
                                   onClick={() => this.props.history.push('/login')}/>}
                    <Menu.Menu position='right'>
                        <Menu.Item><Button
                            onClick={() => this.props.mainStore.realTime = !this.props.mainStore.realTime}
                            primary>{this.props.mainStore.realTime ? 'Turn Off WS' : 'Turn On WS'}</Button></Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default withRouter(inject("mainStore")(observer(NavBar)));