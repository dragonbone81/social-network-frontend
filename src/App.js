import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import Register from './Register';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div>hello world</div>
                <Switch>
                    <Route exact path='/register' component={Register}/>
                </Switch>
            </React.Fragment>
        )
    }
}

export default withRouter(App);