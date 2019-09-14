import React from 'react';
import './index.css';

export default class About extends React.Component {
	render() {
		return(
			<div className="section about">
				<div className="page">
					<h1>Crowdfunding open-source</h1>
					<p>Simple 3-step funding process.</p>
					<div className="section">
						<div>
							<div><p>1</p></div>
							<div></div>
							<div>
								<h2>Setup account</h2>
								<p>The first step to begin earning or funding via open-source is connecting your Github account, and linking it to your Algorand wallet. </p>
							</div>
						</div>
						<div>
							<div><p>2</p></div>
							<div></div>
							<div>
								<h2>Create escrow</h2>
								<p>Next, when a bounty is created, funds are transferred automatically to an escrow account. This account will hold funds till the bounty is complete.</p>
							</div>
						</div>
						<div>
							<div><p>3</p></div>
							<div></div>
							<div>
								<h2>Payout bounty</h2>
								<p>Finally, when the bounty is complete, payout the bounty in a decentralized manner. Simply submit work, or approve a hunters work and they/you will be immediately paid.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
