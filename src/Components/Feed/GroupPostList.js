import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import GroupPostItem from './GroupPostItem';


class GroupPostList extends Component {
    render() {
        return (
            <div>
                {this.props.posts.map((post) => <GroupPostItem key={post.post_id} post={post}/>)}
            </div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(GroupPostList)));