import React from 'react';
import axios from 'axios';
import MDReactComponent from 'markdown-react-js';
import './index.css';

export default class Bounty extends React.Component {
	constructor() {
		super();
		
		this.state = {
			org: '',
			repo: '',
			issue: '',
			hasLoaded: false
		}

		this.showAdmin = this.showAdmin.bind(this);
		this.showMarkdown = this.showMarkdown.bind(this);
	}
	componentWillMount() {
		this.setState({
			org: this.props.match.params.org,
			repo: this.props.match.params.repo,
			issue: this.props.match.params.issue,
		})
	}
	componentDidMount() {
		this.showMarkdown();
	}
	showAdmin() {
		if (localStorage.getItem('isAuthed') === null) {

		} else {
			return <div><h1>Admin Tools</h1><p>Use these administrator tools to manage your bounty settings.</p><button>Generate Test Applicants</button><button>Submit Bounty</button><button>Payout Bounty</button></div>
		}
	}
	showMarkdown() {
		axios.get(`https://api.github.com/repos/${this.state.org}/${this.state.repo}/issues/${this.state.issue}`).then(response => {
			var markdown = response.data.body
			this.setState({
				markdown: markdown,
				hasLoaded: true
			})
		})
	}
	render() {
		return(
			<div className="section bounty">
				<div>
					<h1>Bounty</h1>
					<p>Org: <a href={`https://github.com/${this.state.org}`} target="_blank" rel="noopener noreferrer">{this.state.org}</a></p>
					<p>Repo: <a href={`https://github.com/${this.state.org}/${this.state.repo}`} target="_blank" rel="noopener noreferrer">{this.state.repo}</a></p>
					<p>Issue: <a href={`https://github.com/${this.state.org}/${this.state.repo}/issues/${this.state.issue}`} target="_blank" rel="noopener noreferrer">{`#${this.state.issue}`}</a></p>
					{this.showAdmin()}
				</div>
				<div>
					<div>
						<h3>Bounty Description</h3>
					</div>
					<div>
						{
							this.state.hasLoaded
							? (
								<MDReactComponent text={this.state.markdown} /> 
							)
							: (
								null
							)
						}
					</div>
				</div>
			</div>
		);
	}
}
