import React, {Component} from 'react';
import {Form} from 'semantic-ui-react'
import {register} from './api/auth';

class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        loader: false,
    };
    submit = async () => {
        if (this.state.loader)
            return;
        this.setState({loader: true});
        console.log('hello');
        await register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        });
        this.setState({loader: false});
    };

    render() {
        return (
            <div className="login-form">
                <Form onSubmit={this.submit}>
                    <Form.Group widths='equal'>
                        <Form.Input required type='text' fluid placeholder='First name...' value={this.state.firstname}
                                    onChange={({target}) => this.setState({firstname: target.value})}/>
                        <Form.Input required type='text' fluid placeholder='Last name...' value={this.state.lastname}
                                    onChange={({target}) => this.setState({lastname: target.value})}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input required type='text' fluid placeholder='Username...' value={this.state.username}
                                    onChange={({target}) => this.setState({username: target.value})}/>
                        <Form.Input required type='email' fluid placeholder='Email...' value={this.state.email}
                                    onChange={({target}) => this.setState({email: target.value})}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input required type='password' fluid placeholder='Password...' value={this.state.password}
                                    onChange={({target}) => this.setState({password: target.value})}/>
                    </Form.Group>
                    <Form.Button loading={this.state.loader}>Sign Up</Form.Button>
                </Form>
            </div>
        )
    }
}

export default Register;