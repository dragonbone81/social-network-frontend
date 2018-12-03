import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image, Button, Input} from 'semantic-ui-react';
import GroupPostList from '../Feed/GroupPostList'
import GifBox from '../Chat/GifBox';
import NewGroupModal from '../Modals/NewGroupModal'
import {withRouter, Link} from 'react-router-dom';


class Groups extends Component {
    state = {
        groups: [],
        newGroupModalOpen: false,
    };

    async componentDidMount() {
        if (!this.props.mainStore.user.username)
            this.props.history.push('/login');
        this.setState({groups: await this.props.mainStore.getGroupsForUser()});
    }

    openNewGroupModal = () => {
        this.setState({newGroupModalOpen: true})
    };
    createNewGroup = (users, group_name) => {
        return this.props.mainStore.createGroup(users, group_name);
    };
    refreshUserGroup = () => {
        this.props.mainStore.getGroupsForUser().then((groups) => {
            this.setState({groups: groups}, () => {
                // this.joinAllChats();
            });
        });
    };
    closeNewGroupModal = () => {
        this.setState({newGroupModalOpen: false})
    };

    render() {
        return (
            <div className="chat-container">
                <NewGroupModal createNewGroup={this.createNewGroup} refreshUserGroups={this.refreshUserGroup}
                               open={this.state.newGroupModalOpen}
                               onClose={this.closeNewGroupModal}/>
                <div className="groups-div">
                    <h1>Groups</h1>
                    <div className="feed-inside">
                        {this.state.groups.map((group) => {
                            return (
                                <div className="group-list-item" key={group.group_id}>
                                    <Link to={`/groups/${group.group_id}`}>{group.group_name}</Link>
                                    <span> </span>
                                    <Icon className="hover-icon" name="edit"/>
                                    <Icon className="hover-icon" name="close"/>
                                </div>
                            )
                        })}
                        <br/>
                        <Icon onClick={this.openNewGroupModal} size="huge" className="hover-icon" name="plus circle"/>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(Groups)));