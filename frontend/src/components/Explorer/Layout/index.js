import React from 'react';
import { Link } from 'react-router-dom';
import Box from '../../Landing/Scrollview/box';
import './index.css';
const getBounties = require('../../../helpers/getBounties.js');

export default class Layout extends React.Component {
	constructor() {
		super();
		
		this.state = {
			bounties: [
				{
				  "link": "https://github.com/tensorflow/tensorflow/issues/32465",
				  "value": 0.3,
				  "type": "bounty-create",
				  "date": "2019-09-12T13:27:09Z",
				  "title": "[tflite] Build issue: failed by \\execroot\\org_tensorflow\\bin\\false in Windows",
				  "path": "tensorflow/tensorflow",
				  "num": "32465",
				  "image": "https://avatars1.githubusercontent.com/u/15658638?v=4"
				},
				{
				  "link": "https://github.com/tensorflow/tensorflow/issues/32117",
				  "value": 2.5,
				  "type": "bounty-create",
				  "date": "2019-08-30T13:51:03Z",
				  "title": "tf.Keras.fit() runs forever with 0 samples",
				  "path": "tensorflow/tensorflow",
				  "num": "32117",
				  "image": "https://avatars1.githubusercontent.com/u/15658638?v=4"
				},
				{
				  "link": "https://github.com/kauri-io/Content/issues/50",
				  "value": 25,
				  "type": "bounty-create",
				  "date": "2019-06-25T09:57:35Z",
				  "title": "Deploying Full stack Dapp to Heroku",
				  "path": "kauri-io/Content",
				  "num": "50",
				  "image": "https://avatars3.githubusercontent.com/u/42040459?v=4"
				},
				{
				  "link": "https://github.com/angular/angular/issues/32629",
				  "value": 0.6,
				  "type": "bounty-create",
				  "date": "2019-09-12T03:31:07Z",
				  "title": "Getting Started example app doesn't build locally",
				  "path": "angular/angular",
				  "num": "32629",
				  "image": "https://avatars3.githubusercontent.com/u/139426?v=4"
				},
				{
				  "link": "https://github.com/Synthetixio/synthetix/issues/213",
				  "value": 0.015,
				  "type": "bounty-create",
				  "date": "2019-08-29T06:39:42Z",
				  "title": "Add Synth Exchanges to Uniswap",
				  "path": "Synthetixio/synthetix",
				  "num": "213",
				  "image": "https://avatars3.githubusercontent.com/u/30892445?v=4"
				},
				{
				  "link": "https://github.com/status-im/status-react/issues/8936",
				  "value": 0.000015,
				  "type": "bounty-create",
				  "date": "2019-09-06T13:00:21Z",
				  "title": "Fix installation buttons for sticker packs",
				  "path": "status-im/status-react",
				  "num": "8936",
				  "image": "https://avatars1.githubusercontent.com/u/11767950?v=4"
				},
				{
				  "link": "https://github.com/aionnetwork/aion/issues/896",
				  "value": 0.000005,
				  "type": "bounty-create",
				  "date": "2019-05-07T14:38:29Z",
				  "title": "Paths for config files are confusing",
				  "path": "aionnetwork/aion",
				  "num": "896",
				  "image": "https://avatars1.githubusercontent.com/u/35697463?v=4"
				},
				{
				  "link": "https://github.com/flutter/flutter/issues/40480",
				  "value": 0.0001,
				  "type": "bounty-create",
				  "date": "2019-09-14T03:51:59Z",
				  "title": "SingleChildScrollView very slow  if has MultiTapGestureRecognizer in it when upgrade to flutter 1.9",
				  "path": "flutter/flutter",
				  "num": "40480",
				  "image": "https://avatars3.githubusercontent.com/u/14101776?v=4"
				},
				{
				  "link": "https://github.com/facebook/react/issues/16763",
				  "value": 0.00005,
				  "type": "bounty-create",
				  "date": "2019-09-12T12:38:47Z",
				  "title": "Component rendered into dangerouslySetInnerHTML parentElement sometimes fires event handlers twice",
				  "path": "facebook/react",
				  "num": "16763",
				  "image": "https://avatars3.githubusercontent.com/u/69631?v=4"
				},
				{
				  "link": "https://github.com/expressjs/express/issues/3290",
				  "value": 0.00001,
				  "type": "bounty-create",
				  "date": "2017-04-27T17:47:00Z",
				  "title": "Option to turn off built in 'back' functionality in res.location('back')",
				  "path": "expressjs/express",
				  "num": "3290",
				  "image": "https://avatars2.githubusercontent.com/u/5658226?v=4"
				},
				{
					"link": "https://github.com/GoogleChrome/puppeteer/issues/4911",
					"value": 10,
					"type": "bounty-create",
					"date": "2019-09-05T17:47:00Z",
					"title": "Puppeteer broken on Ubuntu 18.04 after upgrade & restart",
					"path": "GoogleChrome/Puppeteer",
					"num": "4911",
					"image": "https://avatars3.githubusercontent.com/u/1778935?s=200&v=4"
				}
			  ],
			loaded: false
		}
	}
	async componentWillMount() {
		/*let bounties1 = []
		bounties1 = await getBounties()*/
		this.setState({
			//bounties: bounties1,
			loaded: true
		});
		console.log(this.state.bounties);
	}
	renderBounty() {
		if (localStorage.getItem('bounty') === null) {

		} else {
			return <Box avatar={this.state.bounties[10].image} repopath={this.state.bounties[10].path} issue_num={this.state.bounties[10].num} postdate={this.state.bounties[10].date} title={this.state.bounties[10].title} value={this.state.bounties[10].value}/>;
		}
	}
	render() {
		const val = this.state.bounties;
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
					{
						this.state.loaded
						? (
							<div>
								{this.renderBounty()}
								<Box avatar={val[0].image} repopath={val[0].path} issue_num={val[0].num} postdate={val[0].date} title={val[0].title} value={val[0].value}/>
								<Box avatar={val[1].image} repopath={val[1].path} issue_num={val[1].num} postdate={val[1].date} title={val[1].title} value={val[1].value}/>
								<Box avatar={val[2].image} repopath={val[2].path} issue_num={val[2].num} postdate={val[2].date} title={val[2].title} value={val[2].value}/>
								<Box avatar={val[3].image} repopath={val[3].path} issue_num={val[3].num} postdate={val[3].date} title={val[3].title} value={val[3].value}/>
								<Box avatar={val[4].image} repopath={val[4].path} issue_num={val[4].num} postdate={val[4].date} title={val[4].title} value={val[4].value}/>
								<Box avatar={val[5].image} repopath={val[5].path} issue_num={val[5].num} postdate={val[5].date} title={val[5].title} value={val[5].value}/>
								<Box avatar={val[6].image} repopath={val[6].path} issue_num={val[6].num} postdate={val[6].date} title={val[6].title} value={val[6].value}/>
								<Box avatar={val[7].image} repopath={val[7].path} issue_num={val[7].num} postdate={val[7].date} title={val[7].title} value={val[7].value}/>
								<Box avatar={val[8].image} repopath={val[8].path} issue_num={val[8].num} postdate={val[8].date} title={val[8].title} value={val[8].value}/>
								<Box avatar={val[9].image} repopath={val[9].path} issue_num={val[9].num} postdate={val[9].date} title={val[9].title} value={val[9].value}/>
							</div>
						)
						: (
							<h1>Loading...</h1>
						)
					}
				</div>
			</div>
		);
	}
}
