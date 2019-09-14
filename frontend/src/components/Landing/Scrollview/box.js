import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Box extends React.Component {
	render() {
		return(
			<Link className="box" to={`/bounty/${this.props.repopath}/${this.props.issue_num}`}>
				<div>
					<div>
						<img src={this.props.avatar} alt='Avatar'/>
					</div>
					<div>
						<p>{this.props.postdate}</p>
					</div>
				</div>
				<div>
					<div>
						<p>{this.props.title}</p>
					</div>
					<div>
						<p><span>bounty</span> {this.props.repopath}</p>
					</div>
				</div>
				<div>
					<p>{this.props.value} ALGO</p>
					<p>${this.props.value}</p>
				</div>
			</Link>
		);
	}
}
