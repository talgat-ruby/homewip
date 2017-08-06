import React, { Component } from 'react';
import './PageTable.css';

import { Button } from '../../share/';

const ACTIONS = {
	ADD_NEW: 'ADD_NEW',
	EDIT: 'EDIT',
	NONE: 'NONE'
}

class PageTable extends Component {
	state = {
		activeAction: ACTIONS.NONE,
		activeIndex: null,
		activeInput: ''
	}

	ref = null

	componentDidUpdate = () => {
		if(this.ref && this.state.activeAction !== ACTIONS.NONE) {
			this.ref.focus();
		}
	}

	addQuestion = () => {
		const nextOrder = this.props.questions.length > 0 ? this.props.questions.slice(-1)[0].order + 1 : 1;
		this.setState(() => ({
			activeAction: ACTIONS.ADD_NEW,
			activeIndex: this.props.questions.length,
			activeInput: ''
		}));
		this.props.setQuestions([...this.props.questions,{
			text: '',
			order: nextOrder
		}]);
	}

	editQuestion = index => () => {
		this.setState(() => ({
			activeAction: ACTIONS.EDIT,
			activeIndex: index,
			activeInput: this.props.questions[index].text
		}));
	}

	blurHandler = () => {
		if(this.state.activeInput) {
			this.props.setQuestions([
				...this.props.questions.slice(0, this.state.activeIndex),
				{
					...this.props.questions[this.state.activeIndex],
					text: this.state.activeInput
				},
				...this.props.questions.slice(this.state.activeIndex + 1)
			]);
		} else {
			this.props.setQuestions([
				...this.props.questions.slice(0, this.state.activeIndex),
				...this.props.questions.slice(this.state.activeIndex + 1)
			]);
		}

		this.setState(() => ({
			activeAction: ACTIONS.NONE,
			activeIndex: null,
			activeInput: ''
		}));
	}

	changeHandler = ({ target: { value } }) => {
		this.setState(() => ({ activeInput: value }));
	}

	renderTable = ({ text, order }, index) => {
		if(this.state.activeAction === ACTIONS.NONE || this.state.activeIndex !== index) {
			return (
				<div key={`${text}_${order}`} className="row">
					<div className="col">
						<input type="text" value={text} disabled />
					</div>
					<div className="col">{order}</div>
					<div className="col">
						<Button name="Edit" onClick={this.editQuestion(index)} />
					</div>
				</div>
			)
		} else {
			return (
				<div key={`${text}_${order}`} className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.activeInput}
							ref={ref => (this.ref = ref)}
							onChange={this.changeHandler}
							onBlur={this.blurHandler}
						/>
					</div>
					<div className="col">{order}</div>
					<div className="col"><Button name="Edit" disabled/></div>
				</div>
			)

		}
	}

	render = () => (
		<div className="page-table">
			<h3>Questions</h3>
			<Button name="Add" onClick={this.addQuestion} />
			<div className="table">
				<div className="row head">
					<div className="col head">Name</div>
					<div className="col head">Order</div>
					<div className="col head">Action</div>
				</div>
				{this.props.questions.map(this.renderTable)}
			</div>
		</div>
	)
}

export default PageTable;
