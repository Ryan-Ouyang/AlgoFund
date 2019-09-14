import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './index.css';

// TODO: Change logo color
export default class Footer extends React.Component {
	render() {
		return(
			<div>
				<div className="section subfooter">
					<h2>Ready to get started?</h2>
					<div>
						<p>Start contributing to open-source today, and earn while you're at it! Follow our quickstart to connect your Github account and find your first bounty.</p>
					</div>
					<Link to='/temp'>Let's explore bounties</Link>
				</div>
				<div className="section footer">
					<div>
						<img src={logo} alt='AlgoFund logo' />
					</div>
					<div>
						<p>&copy; 2019 AlgoFund | All rights reserved</p>
					</div>
				</div>
			</div>
		);
	}
}
