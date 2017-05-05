import React, { Component } from 'react'
import Radium from 'radium'

import colors from '../styles/colors'
import layout from '../styles/layout'

@Radium
export default class Loader extends Component {
	render() {
		return (
			<div style={styles.overlay}>
				<div style={[layout.centerDiv,styles.messageBox]}>
					<h2 style={styles.message}>
						<div className="spinner">
						  <div className="bounce1"></div>
						  <div className="bounce2"></div>
						  <div className="bounce3"></div>
						</div>
					</h2>
				</div>
			</div>
		)
	}
}

var styles = {
	overlay: {
		position: 'absolute',
		top:0,
		right:0,
		left:0,
		bottom:0,
		zIndex:20,
		background: "rgba(80,80,80,0.7)"
	},
	messageBox: {
		padding: "10px 40px",
		borderRadius: 3,
		background: "rgba(44,44,44,0.7)"
	},
	message: {
		color: colors.gray7,
		margin: 0,
		fontWeight: 200,
		fontSize: 26
	}
}