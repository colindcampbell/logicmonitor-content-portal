import React, { Component } from 'react';
import Radium from 'radium'

import colors from '../styles/colors.js'


@Radium
export default class Button extends Component {

	render() {
		return (
			<button 
				style={[
					styles.base,
					styles[this.props.kind]]}
				className={this.props.kind === "dark" ? "active" : null}
				onClick={this.props.click} >{this.props.value}</button>
		);
	}
}

var styles = {
	default:{
	},
	base: {
		fontWeight: 200,
		background: colors.primary0,
		color: 'white',
		borderWidth: '0 0 2px 0',
		borderColor: colors.secondary4,
    cursor: 'pointer',
    fontSize: 14,
    textDecoration: 'none',
    borderRadius: 2,
    display: 'inline-block',
    outline: 'none',
    height: 33,
    padding: '0 15px',
    transition: 'all 0.1s',
    marginRight: 3,
    marginBottom: 3,
		':hover':{
			background: colors.primary1
		}
	},
	light: {
		background: colors.primary5,
		borderColor: colors.primary1,
		':hover': {
			borderColor: colors.primary0,
			background: colors.primary1
		}
	},
	dark:{
		marginRight:4,
		marginLeft:4,
		background:colors.secondary4,
		':hover': {
			background:colors.secondary4a
		}
	},
	small: {
		fontSize: 11.5,
		padding: "0 5px",
		height: 17,
		marginBottom: 2,
		marginRight: 1,
		color: "black",
		background: colors.secondary3,
		borderWidth: 0,
		alignSelf: "flex-end",
		":hover":{
			color: "white"
		}
	}
}
