import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import React, {Component} from 'react';
import Register from './MainRoutes/Register';
import Login from './MainRoutes/Login';
import Chat from './Components/Chat/Chat';
import Feed from './Components/Feed/Feed';
import GroupFeed from './Components/Groups/GroupFeed';
import Groups from './Components/Groups/Groups';
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
                    <Route exact path='/feed' component={Feed}/>
                    <Route exact path='/groups' component={Groups}/>
                    <Route exact path='/groups/:group_id' component={GroupFeed}/>
                    <Route component={() => <Redirect to="/chat"/>}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(App);