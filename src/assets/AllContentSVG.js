import React, { Component } from 'react'
import Radium from 'radium'

@Radium
export default class AllContent extends Component {
	render() {
		const {fill, style} = this.props
		return (
			<svg style={style} width="26px" height="34px" viewBox="0 0 26 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
		    <title>all-content-icon</title>
		    <desc>All Content icon</desc>
		    <defs></defs>
		    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
		    	<path d="M24.6393757,11.9525171 L13.3118586,0.625 L1.359375,0.625 L1.359375,32.6545311 L24.6393757,32.6545311 L24.6393757,11.9525171 L24.6393757,11.9525171 Z M13.3118586,2.49989938 L22.1395098,11.3275507 L13.3118586,11.3275507 L13.3118586,2.49989938 Z M2.68742873,31.3264774 L2.68742873,1.95305373 L11.9838048,1.95305373 L11.9838048,12.6556044 L23.311322,12.6556044 L23.311322,31.3264774 L2.68742873,31.3264774 Z" id="all-content-icon" stroke={fill} className="path" fill={fill} transform="translate(12.999375, 16.639766) scale(-1, 1) translate(-12.999375, -16.639766) "></path>
		    </g>
		</svg>
		)
	}
}
