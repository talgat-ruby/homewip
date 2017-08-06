import React, { Component } from 'react';
import './Pages.css';

import { generatePath } from '../../utils/';

class Pages extends Component {
	state = {
		pages: []
	}

	componentDidMount = async () => {
		try {
			const res = await fetch('/pages');
			if(!res.ok) {
				throw new Error('Unable to load data. Please try to relaod the page');
			} else {
				const pages = await res.json();
				this.setState(() => ({ pages }));
			}
		} catch(e) {
			console.error(e);
		}
	}

	onRowClick = ({ currentTarget: { dataset: { id } } }) => {
		this.props.history.push(generatePath.page({ id }));
	}

	renderRows = ({ _id, title, order }) => (
		<div
			key={_id}
			className="row"
			data-id={_id}
			onClick={this.onRowClick}
		>
			<div className="col">{title}</div>
			<div className="col">{order}</div>
		</div>
	)

	render = () => (
		<main className="pages">
			<h2>Pages</h2>
			<section className="content">
				<div className="table">
					<div className="row head">
						<div className="col head">Name</div>
						<div className="col head">Order</div>
					</div>
					{this.state.pages.map(this.renderRows)}
				</div>
			</section>
		</main>
	)
}

export default Pages;
