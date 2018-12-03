import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image} from 'semantic-ui-react';
import {withRouter, Link} from 'react-router-dom';


class GroupPostItem extends Component {
    state = {};

    render() {
        return (
            <div className="group-post-item">
                <div className="group-post-item-title">
                    <img className="group-post-image"
                         src='https://react.semantic-ui.com/images/wireframe/square-image.png'/>
                    <div className="group-post-user-time">
                        <div>
                            {this.props.post.firstname} {this.props.post.lastname}
                            <Icon name="arrow alternate circle right"/>
                            <Link to={`/groups/${this.props.post.group_id}`}>{this.props.post.group_name}</Link>
                        </div>
                        <div>
                            {Math.ceil((new Date() - new Date(this.props.post.created_at)) / (1000 * 60))} mins
                        </div>
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