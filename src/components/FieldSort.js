import React, { Component } from 'react';
import Radium from 'radium'

import colors from '../styles/colors'

@Radium
export default class FieldSort extends Component {

	render() {
		const { sort, sortParam, kind } = this.props
		return (
			<h3 style={styles.title} onClick={this.props.click}>
				<span style={[styles.arrow,styles.arrowUp,styles[kind]]}></span>
				{sort.name}
				<span style={[styles.arrow,styles.arrowDown,styles[kind]]}></span>
			</h3>
		);
	}
}

var styles = {
	title: {
		padding: 0,
		margin: "0 -20px 0 0",
		verticalAlign: "middle",
		lineHeight: "100px",
		cursor: "pointer",
		position: "relative",
		textAlign: "center",
		cursor: "pointer",
		float:"right",
		padding:"0 20px",
		"@media (max-width: 768px)": {
      display: 'none'
    },		
	},
	default: {
		borderBottomColor: colors.gray9,
		borderTopColor: colors.gray9
	},
	activeDown: {
		borderBottomColor: colors.gray7,
		borderTopColor: colors.primary1
	},
	activeUp: {
		borderBottomColor: colors.primary1,
		borderTopColor: colors.gray7
	},
	arrow:{
		width: 0,
		height: 0,
		position: "absolute"
	},
	arrowUp:{
		borderLeft: "5px solid transparent",
		borderRight: "5px solid transparent",
		borderBottom: "5px solid gray",
		top:30,
		left: "50%",
		transform: "translateX(-50%)"
	},
	arrowDown:{
		borderLeft: "5px solid transparent",
		borderRight: "5px solid transparent",
		borderTop: "5px solid black",
		bottom:30,
		right: "50%",
		transform: "translateX(50%)"
	}
}


