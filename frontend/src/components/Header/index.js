import React from 'react';
import { NavLink } from 'react-router-dom';
import { HamburgerButton } from 'react-hamburger-button';
import Modal from 'react-responsive-modal';
import logo from './logo.png';
import './index.css';

import Github from './Modals/github';
import Mnemonic from './Modals/mnemonic';

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
			showMenuIcon: true,
			modalOpen: false,
			modalTab: 0,
			clientID: '286b9d923c6b5f25a54a',
			redirectUI: 'http://localhost:3000/explorer',
			token: null,
			isAuthed: false
		};
		
		this.showMenu = this.showMenu.bind(this);
		this.linkCloseMenu = this.linkCloseMenu.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);

		// Handle modal
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		// Handle modal tabs
		this.handleAuth = this.handleAuth.bind(this);
		this.handleMnemonic = this.handleMnemonic.bind(this);
		this.renderTab = this.renderTab.bind(this);

		// Authentication flow
		this.removeAll = this.removeAll.bind(this);
		
		// Animations
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}

	openModal() {
		this.setState({ modalOpen: true })
	}

	closeModal() {
		this.setState({ modalOpen: false, modalTab: 0 })
	}

	handleAuth(e) {
		e.preventDefault();

		window.OAuth.initialize('FeLOU0uV-jhvi0RiwMsYNAdBJGA');

		window.OAuth.popup('github').then((provider) => {
			
			provider.me().then((data) => {
				localStorage.setItem('github-name', data.name);
				localStorage.setItem('github-avatar', data.avatar);
				localStorage.setItem('github-username', data.alias);
				this.setState({ modalTab: this.state.modalTab + 1});
				this.authenticationFlow();
			});
		});
	}

	handleMnemonic(input) {
		localStorage.setItem('mnemonic', input);
		console.log(localStorage.getItem('mnemonic'));
		this.closeModal();
	}

	renderTab() {
		if (this.state.modalTab === 0) {
			return <Github handleAuth={this.handleAuth}/>
		} else {
			return <Mnemonic handleMnemonic={this.handleMnemonic}/>
		}
	}

	authenticationFlow() {
		if (localStorage.getItem('github-name') != null) {
			localStorage.setItem('isAuthed', true);
			this.setState({
				githubUsername: localStorage.getItem('github-name'),
				githubAvatar: localStorage.getItem('github-avatar'),
				buttonText: localStorage.getItem('github-name'),
				isAuthed: true
			})
		} else {
			this.removeAll();
		}
	}

	removeAll() {
		localStorage.removeItem('isAuthed');
		localStorage.removeItem('github-name');
		localStorage.removeItem('github-avatar');
		localStorage.removeItem('github-username');
		this.setState({
			isAuthed: false
		})
	}

	mouseEnter() {
		this.setState({
			buttonText: 'Logout'
		})
	}

	mouseLeave() {
		this.setState({
			buttonText: this.state.githubUsername
		})
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));

		const oauthScript = document.createElement("script");
		oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
		document.body.appendChild(oauthScript);
		this.authenticationFlow();
	}
	render() {
		return(
			<div>
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
								{
									this.state.isAuthed
									? (
										<li><button className="authedButton" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.removeAll}><div><img alt='avatar' src={this.state.githubAvatar}/></div><div><span>{this.state.buttonText}</span></div></button></li>
									)
									: (
										<li><button onClick={this.openModal}>Get Started</button></li>
									)
								}
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
											{
												this.state.isAuthed
												? (
													<li><button className="authedButton" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.removeAll}><div><img alt='avatar' src={this.state.githubAvatar}/></div><div><span>{this.state.buttonText}</span></div></button></li>
												)
												: (
													<li><button onClick={this.openModal}>Get Started</button></li>
												)
											}
										</ul>
									</div>
								)
								: (
									null
								)
						}
					</div>
				</div>
				<Modal
					className="dashboardModal"
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={{
						overlay: "dashboardOverlay",
						modal: "dashboardModal"
					}}
					closeOnOverlayClick={false}
					center
				>
					{ this.renderTab() }
				</Modal>
			</div>
		);
	}
}
