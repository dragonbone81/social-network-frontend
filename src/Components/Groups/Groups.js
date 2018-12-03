import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Icon, List, Image, Button, Input} from 'semantic-ui-react';
import GroupPostList from '../Feed/GroupPostList'
import GifBox from '../Chat/GifBox';
import {withRouter} from 'react-router-dom';


class Groups extends Component {
    state = {};

    render() {
        return (
            <div>groups</div>
        )
    }
}


export default withRouter(inject("mainStore")(observer(Groups)));