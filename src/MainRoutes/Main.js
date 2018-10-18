import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Chat from '../Components/Chat/Chat';
import {Form, Icon} from 'semantic-ui-react'

class Main extends Component {
    render() {
        return (
            <div><Chat/></div>
        )
    }
}

export default inject("mainStore")(observer(Main));