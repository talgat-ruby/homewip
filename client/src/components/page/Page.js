import React, { Component } from 'react';
import './Page.css';

import { generatePath } from '../../utils/';

import PageTable from './page-table/PageTable';
import { Button } from '../share/';

class Page extends Component {
	state = {
		title: '',
		category: '',
		questions: [],
		updated: false
	}

	isAddPage = this.props.location.pathname === generatePath.addPage()
	categoriesList = []

	componentWillMount = async () => {
		try {
			const res = await fetch('/categories');
			if(!res.ok) {
				throw new Error('Unable to load categories');
			} else {
				this.categoriesList = await res.json();
			}
		} catch(e) {
			console.error(e);
		}
	}

	componentDidMount = () => {
		if(!this.isAddPage) {
			this.fetchPageById(this.props.match.params.id);
		}
	}

	fetchPageById = async id => {
		try {
			const res = await fetch(`/page?id=${id}`);
			if(!res.ok) {
				throw new Error('Unable to load data. Please try to relaod the page');
			} else {
				const { title, category, questions } = await res.json();
				this.setState(() => ({ title, category, questions }));
			}
		} catch(e) {
			console.error(e);
		}
	}

	postQuestion = async (headers, body) => {
		try {
			const res = await fetch('/page', {
				method: 'POST',
				headers,
				body: JSON.stringify(body)
			});
			if(res.ok) {
				throw new Error('Unable to save data to db');
			}
		} catch(e) {
			console.error(e);
		} finally {
			this.props.history.push('/');
		}
	}

	putQuestion = async (headers, body) => {
		try {
			const { id } = this.props.match.params;
			const res = await fetch('/page', {
				method: 'PATCH',
				headers,
				body: JSON.stringify({ ...body, id })
			});
			if(res.ok) {
				throw new Error('Unable to save data to db');
			}
		} catch(e) {
			console.error(e);
		} finally {
			this.props.history.push('/');
		}
	}

	save = event => {
		event.preventDefault();
		const headers = new Headers({'Content-Type': 'application/json'});
		const { updated, ...body } = this.state;
		if(this.isAddPage) {
			this.postQuestion(headers, body);
		} else {
			this.putQuestion(headers, body);
		}
	}

	changeHandler = ({ target: { name, value } }) => {
		this.setState(() => ({ [name]: value, updated: true }));
	}

	checkDisabled = () => !(
		this.state.updated && this.state.title && this.state.category && this.state.questions.length > 0
	)

	setQuestions = questions => this.setState(() => ({ questions, updated: true }))

	renderOption = value => <option key={value} value={value} />

	render = () => (
		<main className="page">
			<h2>{this.state.title || (this.isAddPage && 'Add page')}</h2>
			<form className="content" onSubmit={this.save}>
					<div className="input-container">
						<label>Page title</label>
						<input
							type="text"
							name="title"
							required
							value={this.state.title}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="input-container">
						<label>Category</label>
						<input
							type="text"
							name="category"
							list="categories"
							required
							value={this.state.category}
							onChange={this.changeHandler}
						/>
						<datalist id="categories">{this.categoriesList.map(this.renderOption)}</datalist>
					</div>
				<PageTable
					questions={this.state.questions}
					setQuestions={this.setQuestions}
				/>
				<Button name="Save" type="submit" disabled={this.checkDisabled()} />
			</form>
		</main>
	)
}

export default Page;
