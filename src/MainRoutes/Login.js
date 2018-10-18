import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon} from 'semantic-ui-react'

class Login extends Component {
    state = {
        username: '',
        password: '',
        loader: false,
    };
    submit = async () => {
        if (this.state.loader)
            return;
        this.setState({loader: true});
        const success = await this.props.mainStore.login({
            username: this.state.username,
            password: this.state.password,
        });
        this.setState({loader: false});
    };

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <Icon style={{fontSize: 60}} name='lock open'/>
                    <Form onSubmit={this.submit}>
                        <Form.Input required type='text' fluid placeholder='Username...' value={this.state.username}
                                    onChange={({target}) => this.setState({username: target.value})}/>
                        <Form.Input required type='password' fluid placeholder='Password...'
                                    value={this.state.password}
                                    onChange={({target}) => this.setState({password: target.value})}/>
                        <Form.Button loading={this.state.loader}>Login</Form.Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default inject("mainStore")(observer(Login));