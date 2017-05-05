import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'

import TagSection from './TagSection'
import FieldSort from './FieldSort'
import Button from './Button'
import ResourceCategoryFilters from './ResourceCategoryFilters'

import colors from '../styles/colors.js'

@Radium
@observer
export default class PageHeader extends Component {
	constructor(){
		super()
		this.state = {mobileFilters: "hide"}
	}
	toggleFiltersMenu(){
		this.state.mobileFilters === "hide" ? this.setState({mobileFilters:"open"}) : this.setState({mobileFilters:"hide"})
	}
	render() {
		const { filter, tag_categories, swapTagList, swapCategoryList, filter_tags, resource_categories, filter_categories, sorts, sortResourcesByParam, sortParam, navTab, toggleFavorites, activeView, toggleActiveView, showFavorites } = this.props.store
		
		const resourceSorts = sorts.map( (sort,i) => (
			<FieldSort
				key={i+sort.value} 
				sortParam={sortParam} 
				sort={sort} 
				kind={ sort.value === sortParam.key ? ( (sort.reverse === sortParam.reverse) ? "activeDown" : "activeUp") : "default"} 
				click={sortResourcesByParam.bind(this.props.store, sort.value, sort.reverse)} />
		))

		const filterCategories = filter_categories.map( (cat, i) => (
			<Button click={swapCategoryList.bind(this, cat, false)} kind="dark" value={cat} key={i+cat} />
		))

		const filterTags = 
			filter_tags
				.map( (tag, i) => (
			    <Button kind="dark" click={swapTagList.bind(this, tag)} value={tag.split('+')[0]} key={i} />
				))

		const activeFilters = (
			<div style={styles.activeFilters}>
				Active: {filterCategories}{filterTags}
			</div>
		)

		const tags = tag_categories.map( (cat,i) => (
			<TagSection displayFilter={styles.displayFilter} arrowIcon={styles.arrowIcon} key={i+cat} store={this.props.store} tag={cat} />
		))

		return (
			<div style={styles.container}>
				{ ( filterTags.length > 0 || filterCategories.length > 0 ) ? activeFilters : null }
				{resourceSorts}
				<div style={[styles.tagContainer,styles[this.state.mobileFilters]]}>
					<div style={styles.displayFilter} onClick={toggleFavorites.bind(this)}>
						<span style={[styles.displayIcon, styles[(showFavorites ? 'active' : '')]]}> {showFavorites ? '★' : '☆'}</span> {showFavorites ? (<strong>Starred</strong>) : "Starred"}
					</div>
					<div key="resource-view-filter" style={styles.displayFilter} onClick={toggleActiveView.bind(this)}>
						<span style={styles.displayIcon}> {activeView === "grid" ? (<img style={{paddingLeft:2,paddingRight:2}} src={require('../assets/list-view.svg')} />) : (<img style={{paddingLeft:3,paddingRight:3,height:15}} src={require('../assets/grid-view.svg')} />) }</span> {activeView === "grid" ? "List View" : "Grid View"}
					</div>
					<hr style={{borderTop:"1px solid #e8e8e8",margin:"10px 0"}}/>
					<ResourceCategoryFilters displayFilter={styles.displayFilter} arrowIcon={styles.arrowIcon} store={this.props.store}/>
					{tags}
				</div>
				<div style={styles.mobileMenu} id="mobile-menu" className={this.state.mobileFilters} onClick={this.toggleFiltersMenu.bind(this)}>
				  <span></span>
				  <span></span>
				  <span></span>
				  <span></span>
				</div>
			</div>
		)
	}
}

var styles = {
	container: {
		position: 'relative',
		marginLeft:80,
		marginBottom:13,
		marginRight:80,
		borderBottom: "1px solid",
		borderBottomColor: colors.gray9,
		justifyContent: "space-between",
		height:100,
		"@media (max-width: 768px)": {
      marginLeft:20,
      marginRight:20,
    }
	},
	arrowIcon:{
		cursor: "pointer",
		color:colors.gray5,
		marginRight: 18,
		marginLeft: 2,
		fontSize: 19
	},
	displayIcon:{
		cursor:"pointer",
		color: colors.gray6,
		marginRight:16,
		fontSize: 22,
	},
	activeFilters:{
		position:"absolute",
		right:160,
		left:0,
		top:"50%",
		transform:"translateY(-50%)",
		lineHeight:"40px",
		"@media (max-width: 768px)": {
			right:0
		}		
	},
	active:{
		color: colors.secondary2
	},
	displayFilter:{
		padding:16,
		cursor:"pointer",
		transition: "150ms",
		lineHeight: "16px",
		color:colors.gray3,
		":hover":{
			background:colors.gray9,
			transition: "150ms"
		}
	},
	tagContainer: {
		position: "fixed",
		top: 104,
		left: 0,
		bottom: 90,
		width: 260,
		background: "white",
		padding: "10px 0",
		overflowY: "auto",
		boxShadow: "rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px",
		"@media (max-width: 768px)": {
			boxShadow:"none",
			top:104,
			bottom: 0,
      right: '100%',
      left: 'inherit',
      transition: "300ms",
      width:"100%",
      padding:"10px 20px",
      zIndex:10
    },		
	},
	open:{
		"@media (max-width: 768px)": {		
			transform:"translateX(100%)",
			transition: "350ms"
		}
	},
	pageHeader: {
		margin: 0,
		padding: "0 20px 0 10px",
		color: colors.gray1,
		lineHeight: "59px",
		float: "left",
		"@media (max-width: 768px)": {
      fontSize: '21px',
      padding: "0 0 0 10px"
    },		
	},
	mobileMenu:{
		"@media (min-width: 769px)": {
      display: "none"
    }		
	},
	icon: {
		position: "relative",
		verticalAlign: "middle",
		marginRight: 10,
		top: -3
	}
}