import React from 'react'
import '../fonts/fonts.scss'
import DevTools from 'mobx-react-devtools'
import {StyleRoot} from 'radium'

import Navigation from '../components/Navigation'
import Header from '../components/Header'
import CurrentUser from '../store/CurrentUserStore'
import {ResourceStore} from '../store/ResourceStore'
import ResourceList from '../components/ResourceList'
import Contact from '../components/Contact'

const resourceStore = new ResourceStore(CurrentUser)

export default class Layout extends React.Component {
	render(){
		return (
			<StyleRoot>
				<Header resourceStore={resourceStore} currentUser={CurrentUser} />
				<Navigation resourceStore={resourceStore} />
				<main style={styles.container}>
					<ResourceList id={this.props.location.query.id} store={resourceStore}/>
				</main>
				<Contact />
			</StyleRoot>
		);
	}
}
				//<DevTools />


var styles={
	container: {
		fontFamily: 'Avenir',
		fontWeight: 200,
    position: "relative",
    left: 260,
    bottom: 0,
    padding:0,
    height:"100%",
    width: "calc(100% - 260px)",
    "@media (max-width: 768px)": {
      width:"100%",
      left:0
    }
	},
}
