import React from 'react';
import { NavLink } from 'react-router-dom';
import { HamburgerButton } from 'react-hamburger-button';
import logo from './logo.png';
import './index.css';

export default class Header extends React.Component {
	showMenu(event) {
		event.preventDefault();
		
		this.setState({
			showMenu: !this.state.showMenu,
			open: !this.state.open
		});
	}

	linkCloseMenu(event) {
		event.preventDefault();

		this.setState({
			showMenu: false,
			open: false
		});
	}

	updateDimensions() {
		if (window.innerWidth > 720) {
			this.setState({
				showMenu: false,
				open: false,
				showMenuIcon: false
			});
		}
		else {
			this.setState({
				showMenuIcon: true
			});
		}
	}
	
	constructor() {
		super();
		
		this.state = {
			showMenu: false,
			showMenuIcon: true
		};
		
		this.showMenu = this.showMenu.bind(this);
		this.linkCloseMenu = this.linkCloseMenu.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}
	render() {
		return(
			<div className="section header">
				<div className="section subheader">
					<p><span role="img" aria-label="confetti">🎉</span> Check out our platform at HtN2019!</p>
				</div>
				<div className="section mainheader">
					<div>
						<NavLink to="/">
							<img src={logo} alt="AlgoFund logo" />
						</NavLink>
					</div>
					<div>
						<ul className="menu">
							<li><NavLink to="/explorer">Explorer</NavLink></li>
							<li><NavLink to="/temp">Get Started</NavLink></li>
						</ul>
						{
							this.state.showMenuIcon
								? (
									<HamburgerButton
										open={this.state.open}
										onClick={this.showMenu}
										strokeWidth={3}
										color="#fff"
										height={17}
										width={25}
									/>
								)
								: (
									null
								)
						}
					</div>
					{
						this.state.showMenu
							? (
								<div>
									<ul className="menu">
										<li><NavLink to="/explorer">Explorer</NavLink></li>
										<li><NavLink to="/temp">Get Started</NavLink></li>
									</ul>
								</div>
							)
							: (
								null
							)
					}
				</div>
			</div>
		);
	}
}
