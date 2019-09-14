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
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
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

	handleAuth() {
		this.setState({ modalTab: this.state.modalTab + 1});
	}

	handleMnemonic() {
		this.closeModal();
	}

	renderTab() {
		if (this.state.modalTab === 0) {
			return <Github handleAuth={this.handleAuth}/>
		} else {
			return <Mnemonic handleMnemonic={this.handleMnemonic}/>
		}
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
								<li><button onClick={this.openModal}>Get Started</button></li>
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
											<li><button onClick={this.openModal}>Get Started</button></li>
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
					center
				>
					{ this.renderTab() }
				</Modal>
			</div>
		);
	}
}
