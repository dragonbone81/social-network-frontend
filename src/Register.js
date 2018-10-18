import React, {Component} from 'react';
import {Form} from 'semantic-ui-react'

class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
    };
    submit = async () => {
        console.log('hello')
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
                    <Form.Button>Sign Up</Form.Button>
                </Form>
            </div>
        )
    }
}

export default Register;