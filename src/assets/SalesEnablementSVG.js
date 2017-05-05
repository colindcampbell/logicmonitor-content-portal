import React, { Component } from 'react'
import Radium from 'radium'

@Radium
export default class SalesEnablement extends Component {
	render() {
		const {fill, style} = this.props
		return (
			<svg style={style} width="34px" height="31px" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg">
		    <title>sales-enablement-icon</title>
		    <desc>Sales Enablement icon</desc>
		    <defs></defs>
		    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
		        <path d="M21.6875,4.484375 L21.6875,1.203125 L12.3125,1.203125 L12.3125,4.484375 L0.984375,4.484375 L0.984375,29.796875 L33.015625,29.796875 L33.015625,4.484375 L21.6875,4.484375 Z M13.640625,2.53125 L20.359375,2.53125 L20.359375,4.484375 L13.640625,4.484375 L13.640625,2.53125 Z M12.3125,5.8125 L31.6875,5.8125 L31.6875,16.515625 L21.6875,16.515625 L21.6875,13.859375 L12.3125,13.859375 L12.3125,16.515625 L2.3125,16.515625 L2.3125,5.8125 L12.3125,5.8125 Z M20.359375,15.1875 L20.359375,19.171875 L13.640625,19.171875 L13.640625,15.1875 L20.359375,15.1875 Z M2.3125,28.46875 L2.3125,17.84375 L12.3125,17.84375 L12.3125,20.5 L21.6875,20.5 L21.6875,17.84375 L31.6875,17.84375 L31.6875,28.46875 L2.3125,28.46875 Z" stroke={fill} className="path" fill={fill}></path>
		    </g>
		</svg>
		)
	}
}
