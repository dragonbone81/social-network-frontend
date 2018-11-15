import {Switch, Route, withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import Register from './MainRoutes/Register';
import Login from './MainRoutes/Login';
import Chat from './Components/Chat/Chat';
import NavBar from './Components/NavBar'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="full-app">
                <NavBar/>
                <Switch>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/chat' component={Chat}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(App);