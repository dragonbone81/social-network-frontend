import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image} from 'semantic-ui-react';
import GroupPostList from './GroupPostList'
import {withRouter} from 'react-router-dom';


class Feed extends Component {
    state = {
        posts: []
    };

    async componentDidMount() {
        if (!this.props.mainStore.user.username)
            this.props.history.push('/login');
        this.setState({posts: (await this.props.mainStore.getAllPostsAllGroupsForUser()).reverse()})
    }

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