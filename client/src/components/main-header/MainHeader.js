//@flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './MainHeader.css';

import { generatePath } from '../../utils/';

import { Button } from '../share/';

const MainHeader = ({ history, location }) => {
	const onLogoClick = () => {
		history.push('/');
	};

	const onAddPageClick = () => {
		history.push(generatePath.addPage());
	};

	return (
		<header className="main-header">
			<img
				className="logo"
				src={logo}
				alt="react logo"
				onClick={onLogoClick}
			/>
			{!location.pathname.includes('/page/') && <Button name="Add page" onClick={onAddPageClick} />}
		</header>
	);
}

export default withRouter(MainHeader);
