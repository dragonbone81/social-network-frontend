import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";

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
                        onClick={()=>this.props.history.push('/chat')}
                    />
                    <Menu.Item name='/login' active={activeItem === '/login'} onClick={()=>this.props.history.push('/login')}/>
                </Menu>
            </div>
        )
    }
}

export default withRouter(NavBar);