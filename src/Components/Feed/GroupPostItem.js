import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image} from 'semantic-ui-react';
import {withRouter, Link} from 'react-router-dom';


class GroupPostItem extends Component {
    state = {
        mouseOnIcon: false,
        likes: [],
        postLiked: false,
    };

    componentDidMount() {
        this.props.mainStore.getLikesOnPost(this.props.post.group_id, this.props.post.post_id).then((likes) => {
            this.setState({likes: likes});
            if (likes.some((like) => like.username === this.props.mainStore.user.username)) {
                this.setState({postLiked: true});
            }
        })
    }

    likePost = () => {
        if (this.state.postLiked) {
            this.unlikePost();
            return;
        }
        this.props.mainStore.addLike(this.props.post.group_id, this.props.post.post_id).then((like) => {
            if (like) {
                this.setState({
                    postLiked: true,
                    likes: [...this.state.likes, {username: this.props.mainStore.user.username, like_id: like.like_id}]
                });
            }
        });
    };

    unlikePost = () => {
        this.props.mainStore.deleteLike(this.props.post.group_id, this.props.post.post_id).then((like) => {
            if (like) {
                this.setState({
                    postLiked: false,
                    likes: this.state.likes.filter((like) => like.username === this.props.mainStore.user.username)
                });
            }
        });
    };

    render() {
        return (
            <div className="group-post-item">
                <div className="group-post-top">
                    <div className="group-post-item-title">
                        <img className="group-post-image"
                             src='https://react.semantic-ui.com/images/wireframe/square-image.png'/>
                        <div className="group-post-user-time">
                            <div>
                                {this.props.post.firstname} {this.props.post.lastname}
                                {this.props.post.group_name ? <>
                                    <Icon name="arrow alternate circle right"/>
                                    <Link to={`/groups/${this.props.post.group_id}`}>{this.props.post.group_name}</Link>
                                </> : null
                                }
                            </div>
                            <div>
                                {Math.ceil((new Date() - new Date(this.props.post.created_at)) / (1000 * 60))} mins
                            </div>
                        </div>
                    </div>
                    <div className="group-like-div">
                        <div className="like-icon-container">
                            <Icon onMouseLeave={() => this.setState({mouseOnIcon: false})}
                                  onMouseEnter={() => this.setState({mouseOnIcon: true})} className="like-icon"
                                  onClick={this.likePost}
                                  name={this.state.postLiked ? "smile" : this.state.mouseOnIcon ? "smile" : "smile outline"}/>
                        </div>
                        <span className="like-count">{this.state.likes.length}</span>
                    </div>
                </div>
                <div className="group-post-item-body">
                    {this.props.post.text}
                </div>
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(GroupPostItem)));