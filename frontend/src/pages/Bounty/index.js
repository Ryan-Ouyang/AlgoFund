import React from 'react';

export default class Bounty extends React.Component {
	constructor() {

	}
	render() {
		return(
			<p>{this.props.match.params.org}</p>
		);
	}
}
