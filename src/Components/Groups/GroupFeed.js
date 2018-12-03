import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image, Button, Input} from 'semantic-ui-react';
import GroupPostList from '../Feed/GroupPostList'
import GifBox from '../Chat/GifBox';
import {withRouter} from 'react-router-dom';


class GroupFeed extends Component {
    state = {
        group: {},
        posts: [],
        post: '',
        submitting: false,
    };

    async componentDidMount() {
        if (!this.props.mainStore.user.username)
            this.props.history.push('/login');
        this.setState({group: await this.props.mainStore.getGroupInfo(this.props.match.params.group_id)});
        this.setState({posts: (await this.props.mainStore.getAllPostsForGroup(this.props.match.params.group_id)).reverse()});
    }

    submit = async () => {
        if (this.state.post === '')
            return;
        this.setState({submitting: true});
        const post = await this.props.mainStore.addPost(this.props.match.params.group_id, this.state.post);
        this.setState(
            {
                submitting: false,
                post: '',
                posts: [{
                    created_at: (new Date()).toString(),
                    firstname: this.props.mainStore.user.firstname,
                    lastname: this.props.mainStore.user.lastname,
                    post_id: post.post_id,
                    text: this.state.post,
                    username: this.props.mainStore.user.username,
                }, ...this.state.posts]
            }
        )
    };

    render() {
        return (
            <div className="chat-container">
                <div className="feed-div">
                    <h2>{this.state.group.group_name}</h2>
                    <div className="post-form">
                        <Form onSubmit={this.submit}>
                            <Input disabled={this.state.submitting} loading={this.state.submitting} type='text' fluid
                                   placeholder={'Type your post...'}
                                   value={this.state.post}
                                   onChange={({target}) => {
                                       this.setState({post: target.value});
                                   }}/>
                        </Form>
                    </div>
                    <div className="feed-inside group">
                        <GroupPostList posts={this.state.posts}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(GroupFeed)));