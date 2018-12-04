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
        this.props.mainStore.joinGroupWS(this.props.match.params.group_id);
        this.props.mainStore.socket.on('post', (data) => {
            console.log('groupfeed');
            delete data.post.group_name;
            this.setState({posts: [data.post, ...this.state.posts]})
        });
        this.setState({group: await this.props.mainStore.getGroupInfo(this.props.match.params.group_id)});
        this.setState({
            posts: (await this.props.mainStore.getAllPostsForGroup(this.props.match.params.group_id)).reverse().map((post) => {
                return {...post, group_id: this.props.match.params.group_id};
            })
        });
    }

    submit = async () => {
        if (this.state.post === '')
            return;
        this.setState({submitting: true});
        // const post = await this.props.mainStore.addPost(this.props.match.params.group_id, this.state.post);
        this.props.mainStore.addPostGroupWS(this.props.match.params.group_id, this.state.post);
        this.setState(
            {
                submitting: false,
                post: '',
                posts: [{
                    created_at: (new Date()).toString(),
                    firstname: this.props.mainStore.user.firstname,
                    lastname: this.props.mainStore.user.lastname,
                    post_id: this.state.posts.length > 0 ? this.state.posts[0].post_id + 1 : 0,
                    text: this.state.post,
                    username: this.props.mainStore.user.username,
                    group_id: this.props.match.params.group_id,
                }, ...this.state.posts]
            }
        )
    };

    componentWillUnmount() {
        this.props.mainStore.leaveGroupWS(this.props.match.params.group_id);
        this.props.mainStore.socket.off('post');
    }

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