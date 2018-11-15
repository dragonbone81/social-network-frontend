import React, {Component} from 'react';
import {Form, List, Modal} from 'semantic-ui-react';
import {inject, observer} from "mobx-react";

class NewChatModal extends Component {
    state = {
        loading: false,
        options: [],
        users: [],
        placeholder: 'search for user',
        value: '',
        error: null,
        loader: false,
        chat_name: '',
    };
    handleSearchChange = (e, {searchQuery}) => {
        if (searchQuery.length >= 3) {
            this.setState({loading: true});
            this.props.mainStore.getUsersDropdown(searchQuery).then((response) => {
                    this.setState({
                        options: response.slice(0, 30).map((user) => {
                            return {
                                key: user.username,
                                text: `${user.firstname} ${user.lastname} : ${user.username}`,
                                value: user.username
                            }
                        }),
                        loading: false,
                    })
                }
            )
        }
    };
    handleChange = (e, {value}) => {
        if (!this.state.users.includes(value)) {
            this.setState({users: [...this.state.users, value]});
            this.setState({error: false, placeholder: 'Add more...'});
        } else {
            this.setState({error: true, placeholder: 'Add more...'});
        }
    };

    filterOutChosen = (options) => {
        return options.filter((option) => !this.state.users.includes(option.key))
    };
    submit = async () => {
        if (this.state.loader)
            return;
        this.setState({loader: true});
        const response = await this.props.createNewChat(this.state.users, this.state.chat_name);
        if (response) {
            this.setState({loader: false});
            this.props.refreshUserChats();
            this.close();
        } else {
            this.setState({error: true});
        }
    };
    close = () => {
        this.setState({
            loading: false,
            options: [],
            users: [],
            placeholder: 'search for user',
            value: '',
            error: null,
            loader: false,
            chat_name: '',
        });
        this.props.onClose();
    };

    render() {
        return (
            <Modal open={this.props.open} onClose={this.close} closeIcon>
                <Modal.Header>Create Chat</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.submit}>
                        <Form.Input required type='text' fluid placeholder='Chat name...' value={this.state.chat_name}
                                    onChange={({target}) => this.setState({chat_name: target.value})}/>
                        <Form.Dropdown
                            fluid
                            selection
                            multiple={false}
                            search={this.filterOutChosen}
                            options={this.state.options}
                            placeholder={this.state.placeholder}
                            onChange={this.handleChange}
                            onSearchChange={this.handleSearchChange}
                            loading={this.state.loading}
                            value={this.state.value}
                            minCharacters={3}
                            selectOnNavigation={false}
                        />
                        {this.state.error ? <p>Course already entered</p> : null}
                        <List>
                            {this.state.users.map((user) => {
                                return <List.Item key={user}>{user}</List.Item>
                            })}
                        </List>
                        <Form.Button loading={this.state.loader}>Create Chat</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default inject("mainStore")(observer(NewChatModal));