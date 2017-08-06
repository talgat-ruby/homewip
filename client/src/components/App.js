//@flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { generatePath } from '../utils/';

import MainHeader from './main-header/MainHeader';
import Pages from './pages/Pages';
import Page from './page/Page';

class App extends Component {
	render = () => (
		<div className="app">
			<MainHeader />
			<Switch>
				<Route exact path="/" render={() => <Redirect to={generatePath.pages()} />}/>
				<Route exact path="/pages" component={Pages} />}/>
				<Route exact path="/page/:id" component={Page} />}/>
				<Route exact path="/incorrect-path" render={() => <div>Please check you URL</div>}/>
				<Route render={() => <Redirect to="/incorrect-path" />}/>
			</Switch>
		</div>
	)
}

export default App;
