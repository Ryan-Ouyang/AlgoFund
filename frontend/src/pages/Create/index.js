import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';
const sendTransaction = require('../../helpers/sendTransaction.js');

export default class Create extends React.Component {
	constructor() {
		super();

		this.state = {
			returnedValue: '',
			issueLink: '',
			buttonSubmit: false,
			transCompleted: false
		}

		this.returnValue = this.returnValue.bind(this);
		this.renderMarkdown = this.renderMarkdown.bind(this);
		this.returnValueAlgo = this.returnValueAlgo.bind(this);
		this.submitBounty = this.submitBounty.bind(this);
		this.showButton = this.showButton.bind(this);
	}
	returnValue(evt) {
		this.setState({
			issueLink: evt.target.value
		})
	}
	returnValueAlgo(evt) {
		this.setState({
			issueValue: evt.target.value
		})
	}
	renderMarkdown() {
		axios.get(`https://api.github.com/repos/${this.state.issueLink.substr(19)}`).then(response => {
			this.setState({
				returnedValue: response.data.body,
				buttonSubmit: true
			})
		});
	}
	submitBounty() {
		console.log('Submit');
		const note = {
			type: "bounty-create",
			link: this.state.issueLink
		}
		sendTransaction(localStorage.getItem('mnemonic'), note, this.state.issueValue * 1000000);
		this.setState({
			transCompleted: true
		})
		localStorage.setItem('bounty', true);
	}
	showButton() {
		if (this.state.buttonSubmit === false) {
			return <button onClick={this.renderMarkdown}>Render Markdown</button>;
		} else if (this.state.buttonSubmit === true && this.state.transCompleted === false) {
			return <button onClick={this.submitBounty}>Submit Bounty</button>;
		} else {
			return <button disabled style={disabled}>Bounty Submitted</button>;
		}
	}
	render() {
		return(
			<div className="section create">
				<div>
					<h1>Create Bounty</h1>
					<p>Get started with AlgoFund by creating, and funding your first issue bounty.</p>
					<p>It's as simple as pasting in an existing issue and paying with your Algo balance.</p>
					<Link to='/explorer'>Back to Explorer</Link>
				</div>
				<div>
					<div>
						<h3>Create Bounty</h3>
					</div>
					<div>
						<h4>Github issue link</h4>
						<p>What is the link to your Github issue? Please include the full link.</p>
						<input placeholder='Github Issue Link' value={this.state.issueLink} onChange={this.returnValue}/>
						<div>
							<div>
								<h4>Algo value</h4>
								<p>How many algo would you like to put up?</p>
								<input type="number" placeholder='Algo Value' onChange={this.returnValueAlgo}/>
							</div>
							<div>
								<h4>Completion time</h4>
								<p>On average, predict completion time (hours).</p>
								<input type="number" max="24" placeholder='Est. completion time'/>
							</div>
						</div>
						<h4>Returned github copy</h4>
						<p>Here is what will be posted:</p>
						<textarea value={this.state.returnedValue} readOnly></textarea>
						{
							this.showButton()
						}
					</div>
				</div>
			</div>
		)
	}
}

const disabled = {
	backgroundColor: "#a4c639",
}
