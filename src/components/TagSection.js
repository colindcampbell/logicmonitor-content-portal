import React, { Component } from 'react';
import Button from './Button'
import Radium from 'radium'
import { observer } from 'mobx-react'

import colors from '../styles/colors'

@Radium
@observer
export default class TagSection extends Component {
  constructor(props){
  	super()
  	this.state = {showTags:false}
  }
  onClick() {
    this.setState({ showTags: !this.state.showTags })
  }
	render() {
		const { filter_tags, all_tags, swapTagList } = this.props.store,
					tagCategory = this.props.tag
				
		const allTags =
			all_tags
				.filter(tag => (
					tag.split('+')[1] === tagCategory
				))
				.map( (tag, i) => (
			    <Button click={swapTagList.bind(this, tag)} kind="light" value={tag.split('+')[0]} key={i} />
				))

		const tags = (
				<div style={{margin:"10px 0",padding:"0 10px 0 30px"}}>
					{allTags}
				</div>
			)

		return (
			<div>
				<div style={this.props.displayFilter} onClick={this.onClick.bind(this)}>
					<span style={this.props.arrowIcon}>{this.state.showTags ? '▼' : '▷'}</span> {tagCategory}
				</div>
				{this.state.showTags ? tags : null}
			</div>
		);
	}
}

var styles = {
	tagListContainger: {
		height:0,
		overflow: "hidden"
	},
	tagSectionTitle:{
		cursor:"pointer"
	}
}


