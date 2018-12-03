import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image} from 'semantic-ui-react';
import GroupPostList from './GroupPostList'
import {withRouter} from 'react-router-dom';


class Feed extends Component {
    state = {
        posts: [],
        groups: [],
    };

    async componentDidMount() {
        if (!this.props.mainStore.user.username)
            this.props.history.push('/login');
        this.props.mainStore.getAllPostsAllGroupsForUser().then((posts) => {
            this.setState({posts: posts.reverse()});
        });
        this.props.mainStore.getGroupsForUser().then((groups) => {
            this.setState({groups: groups}, () => {
                this.joinAllGroups();
            });
        });
        this.props.mainStore.socket.on('post', (data) => {
            console.log('reg feed');
            this.setState({posts: [{...data.post, group_id: data.group_id}, ...this.state.posts]})
        });
    }

    componentWillUnmount() {
        this.state.groups.forEach((group) => {
            this.props.mainStore.leaveGroupWS(group.group_id);
        });
        this.props.mainStore.socket.off('post');
    }

    joinAllGroups = () => {
        this.state.groups.forEach((group) => {
            this.props.mainStore.joinGroupWS(group.group_id);
        })
    };

    render() {
        return (
            <div className="chat-container">
                <div className="feed-div">
                    <h2>Feed</h2>
                    <div className="feed-inside">
                        <GroupPostList posts={this.state.posts}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(Feed)));