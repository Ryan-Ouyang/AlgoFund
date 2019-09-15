import React from 'react';
const sendIdentityVerification = require('../../../helpers/sendIdentityVerification.js');

export default class Mnemonic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	handleSubmit(event) {
		event.preventDefault();
		this.props.handleMnemonic(this.state.value);
		if (localStorage.getItem('hasBeenAdded') === null) {
			localStorage.setItem('hasBeenAdded', true);
			sendIdentityVerification(localStorage.getItem('mnemonic'), localStorage.getItem('github-username'));
		}
	}
	componentWillMount() {
		this.setState({
			username: localStorage.getItem('github-name').split(" ")[0]
		})
	}
	render() {
		return(
			<div>
				<div>
					<h2>Welcome {this.state.username}!</h2>
				</div>
				<div>
					<p>Next, please setup your mnemonic passphrase with AlgoFund.</p>
					<form onSubmit={this.handleSubmit}>
						<textarea type="text" value={this.state.value} onChange={this.handleChange}></textarea>
						<button type="submit" value="submit">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}
