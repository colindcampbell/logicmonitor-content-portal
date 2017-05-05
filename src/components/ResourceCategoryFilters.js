import React, { Component } from 'react';
import Radium from 'radium'
import { observer } from 'mobx-react'

import Button from './Button'

import colors from '../styles/colors.js'

@Radium
@observer
export default class ResourceCategoryFilters extends Component {
  constructor(props){
  	super()
  	this.state = {showTags:false}
  }
  onClick() {
    this.setState({ showTags: !this.state.showTags })
  }
  // determineState(filterTags){
  // 	filterTags.length !== 0 ? this.state.showTags = true : null
  // }
	render() {
		const { resource_categories, swapCategoryList } = this.props.store
		// const filterCategories = filter_categories.map( (cat, i) => (
		// 	<Button click={swapCategoryList.bind(this, cat, false)} kind="dark" value={cat} key={i+cat} />
		// ))

		const allCategories = resource_categories.map( (cat, i) => (
			cat ? <Button click={swapCategoryList.bind(this, cat, false)} kind="light" value={cat} key={i} /> : null
		))

		const tags = (
				<div style={{margin:"10px 0",paddingLeft:30}}>
					{allCategories}
				</div>
			)

		const arrowRight = <div style={[this.props.displayIcon,styles.arrowRight]}></div>,
					arrowDown = <div style={[this.props.displayIcon,styles.arrowDown]}></div>

		// this.determineState(filterCategories)

		return (
			<div>
				<div style={this.props.displayFilter} onClick={this.onClick.bind(this)}>
					<span style={this.props.arrowIcon}>{this.state.showTags ? '▼' : '▷'}</span> Type
				</div>
				{this.state.showTags ? tags : null}
			</div>
		);
	}
}

var styles = {
	arrowRight:{
		display: "inline-block",
	  width: 0,
	  height: 0,
	  borderTop: "6px solid transparent",
	  borderBottom: "6px solid transparent",
	  borderLeft: "7px solid",
	  borderLeftColor: colors.gray7
	},
	arrowDown:{
		display: "inline-block",
	  width: 0,
	  height: 0,
	  borderLeft: "5px solid transparent",
	  borderRight: "5px solid transparent",
	  borderTop: "7px solid",
	  borderTopColor: colors.gray7
	},	
}