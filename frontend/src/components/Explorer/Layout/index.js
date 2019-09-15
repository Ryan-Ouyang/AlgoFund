import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Layout extends React.Component {
	render() {
		return(
			<div className="layout">
				<div>
					<div>
						<h1>Explorer</h1>
						<Link to="/create">+ Create Bounty</Link>
					</div>
					<div>
						<h3>Stage</h3>
						<p>Filter by specific bounty stage.</p>
						<button>Newly Funded</button>
						<button>Accepted</button>
						<button>Submitted</button>
						<button>Completed</button>
					</div>
					<div>
						<h3>Sort</h3>
						<p>Sort by bounty characteristics.</p>
						<button>Most Recent</button>
						<button>Value: Low to High</button>
						<button>Bounty Created</button>
					</div>
				</div>
				<div>

				</div>
			</div>
		);
	}
}
