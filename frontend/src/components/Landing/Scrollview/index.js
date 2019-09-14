import React from 'react';
import Box from './box';
import axios from 'axios';
import moment from 'moment';
import OwlCarousel from 'react-owl-carousel2';
import './index.css';

const options = {
	items: 3,
	nav: false,
	autoplay: true,
	loop: true,

};

export default class Scrollview extends React.Component {
	constructor() {
		super();
		
		this.state = {
			bounties: [['https://github.com/npm/arborist/issues/6', 370], ['https://github.com/filecoin-project/devgrants/issues/12', 2000], ['https://github.com/libra/libra/issues/384', 3200], ['https://github.com/salesforce/ctrl/issues/4', 1200], ['https://github.com/flutter/flutter/issues/40494', 60], ['https://github.com/keybase/client/issues/19504', 4400]],
			append: [['Loading', 'Loading', 'Loading', 'Loading', 500], ['Loading', 'Loading', 'Loading', 'Loading', 500], ['Loading', 'Loading', 'Loading', 'Loading', 500]],
			loaded: false
		};

		this.pullInfo = this.pullInfo.bind(this);
	}
	async pullInfo() {
		let appendArray = [];
		for (let i = 0; i < this.state.bounties.length; i++) {
			const bounty = this.state.bounties[i];
			const newurl = bounty[0].substring(19);
			
			await axios.get(`https://api.github.com/repos/${newurl}`).then(response => {
				const [postdate, title, repopath, value, issue_num] = [moment(response.data.created_at).fromNow(), response.data.title, newurl.split('/issues/')[0], bounty[1], newurl.split('/')[newurl.split('/').length - 1]];
				axios.get(`https://api.github.com/users/${newurl.substring(0, newurl.indexOf('/'))}`).then(async response => {
					const avatar = response.data.avatar_url;
					await appendArray.push([avatar, postdate, title, repopath, value, issue_num]);
				});
			});
		}
		await this.setState({
			append: appendArray,
			loaded: true
		})

		console.log(this.state.append)
	}
	componentDidMount() {
		this.pullInfo();
	}
	render() {
		const val = this.state.append;
		return(
			<div>
				{
					this.state.loaded
					? (
						<div className="section scrollview">
						<OwlCarousel className="owl" ref="owl" options={options}>
							<Box avatar={val[0][0]} postdate={val[0][1]} title={val[0][2]} repopath={val[0][3]} value={val[0][4]} issue_num={val[0][5]}/>
							<Box avatar={val[1][0]} postdate={val[1][1]} title={val[1][2]} repopath={val[1][3]} value={val[1][4]} issue_num={val[1][5]}/>
							<Box avatar={val[2][0]} postdate={val[2][1]} title={val[2][2]} repopath={val[2][3]} value={val[2][4]} issue_num={val[2][5]}/>
							<Box avatar={val[3][0]} postdate={val[3][1]} title={val[3][2]} repopath={val[3][3]} value={val[3][4]} issue_num={val[3][5]}/>
							<Box avatar={val[4][0]} postdate={val[4][1]} title={val[4][2]} repopath={val[4][3]} value={val[4][4]} issue_num={val[4][5]}/>
						</OwlCarousel>
						</div>
					)
					: (
						null
					)
				}
			</div>
		);
	}
}

// TODO: Refactor this garbage code please. It is an absolute abomination but for some reason child-dom rendering just would not work.
