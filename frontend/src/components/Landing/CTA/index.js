import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class CTA extends React.Component {
	render() {
		return(
			<div className="section CTA">
				<div className="section filter">
					<div className="page">
						<div>
							<h1>Bounty. Fund. Solve.</h1>
							<p>AlgoFund lets you fund open-source issues in a decentralized manner. Set bounties, find bounty hunters, and solve problems.</p>
							<div className="section">
								<ul>
									<li><Link to="/explorer">See Bounties</Link></li>
									<li><Link to="/temp">Get Started</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
