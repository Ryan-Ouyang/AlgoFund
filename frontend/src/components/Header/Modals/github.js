import React from 'react';
import github from './github.svg';

export default class Github extends React.Component {
	render() {
		return(
			<div>
				<div>
					<h2>Signin w/ Github</h2>
				</div>
				<div>
					<button onClick={this.props.handleAuth}>
						<div>
							<img src={github} alt='Github logo' width="100px" />
						</div>
					</button>
				</div>
			</div>
		);
	}
}
