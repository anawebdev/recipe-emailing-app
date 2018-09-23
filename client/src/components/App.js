import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import * as actions from '../actions'; 
import SurveyNew from './surveys/SurveyNew'




class App extends Component {
    componentDidMount() {
        // figure out if user is signed in
        this.props.fetchUser();
    }
    render () {
        return (
            <div className="row">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/surveys' component={Dashboard} />
                        <Route exact path='/surveys/new' component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    } 
};

export default connect(null, actions)(App);