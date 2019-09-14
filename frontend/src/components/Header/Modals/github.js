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
					<button>
						<div>
							<img src={github} alt='Github logo' />
						</div>
					</button>
				</div>
			</div>
		);
	}
}
