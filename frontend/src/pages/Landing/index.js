import React from 'react';

import CTA from '../../components/Landing/CTA';
import Scrollview from '../../components/Landing/Scrollview';
import About from '../../components/Landing/About';
import Footer from '../../components/Landing/Footer';

export default class Landing extends React.Component {
	render() {
		return(
			<div>
				<CTA />
				<Scrollview />
				<About />
				<Footer />
			</div>
		);
	}
}

// footer, cta, About (with six sub sections)
