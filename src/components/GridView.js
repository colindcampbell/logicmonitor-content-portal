import React, { Component } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { observer } from 'mobx-react'

import colors from '../styles/colors.js'


@Radium
export default class GridView extends Component {
	render() {
		const { resource, tab, isFavorite } = this.props,
					{ showFavorites, addToFavorites, removeFromFavorites } = this.props.store,
					itemURL = '/?id='+resource.id + (tab === '' ? '' : '&tab='+tab)

		const resourceCategories = resource.categories.map( (cat,i) => (
			<span style={styles.resourceType} key={i+cat+i}>{cat}{ i < (resource.categories.length - 1) ? " - " : null}</span>
		)),
		addFavorite = (
			<div style={[styles.favorite,styles.addFavorite]} onClick={addToFavorites.bind(this,resource.id)}>&#9734;</div>
		),
		removeFavorite = (
			<div style={[styles.favorite,styles.removeFavorite]} onClick={removeFromFavorites.bind(this,resource.id)}>&#9733;</div>				
		),
		lmPDF = (
			<a target="_blank" href={resource.lm_pdf} style={{paddingRight:18,paddingTop:3,marginRight:15,borderRight:"1px solid #e8e8e8"}}>
				<img style={{verticalAlign:"bottom"}} src={require('../assets/lm-circle-logo.svg')} alt=""/>
			</a>
		),
		googlePDF = (
			<a target="_blank" href={resource.google_pdf}>
				<img style={{verticalAlign:"bottom",height:28}} src={require('../assets/drive-icon.png')} alt=""/>
			</a>
		)
		return (
			<div key={resource.id} style={styles.containerBox} >
				<Link style={styles.detailLink} to={itemURL}>
					<div style={styles.innerBase} >
						<h3 style={styles.resourceTitle}>{resource.title}</h3>
						{resourceCategories}
						<div className="list-description" dangerouslySetInnerHTML={{__html:resource.description.substring(0,150).trim() + '...'}}></div>
					</div>
					{isFavorite ? removeFavorite : addFavorite}
				</Link>
				<div style={styles.iconContainer}>
					{resource.lm_pdf === undefined ? null : lmPDF}{resource.google_pdf === "" ? null : googlePDF}
				</div>
			</div>
		)
	}
}

var styles = {
	containerBox: {
		height: 223,
		margin: 13,
		boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",		
		background: "#ffffff",
		width: "calc(100% - 26px)",
		position: "relative",
		overflow: "hidden",
		display: "flex",
		borderRadius: 2,
		":hover":{
			transition: "150ms background",
			background: colors.primary9
		}		
	},
	paragraph:{
		color: colors.gray5,
		fontSize: 12,
		margin:0,
	},
	resourceTitle:{
		whiteSpace:"nowrap",
		wordWrap:"break-word",
		color:colors.secondary4,
		fontSize:18,
		marginBottom:0,
		textOverflow: "ellipsis",
	},
	favorite:{
    position: "absolute",
    right: 16,
    bottom: 14,
    fontSize: 20,
    cursor: "pointer"
	},
	addFavorite:{
		color:colors.gray7
	},
	removeFavorite:{
		color:colors.secondary2,
		fontSize: 23,
		// right:13
	},
	tagContainer: {
		position: "absolute",
		bottom: 7,
		display: "flex",
		flexWrap: "wrap-reverse"
	},
	tagButton: {
		alignSelf: "flex-end"
	},
	detailLink:{
		textDecoration: "none",
		width:"100%",
		transition: "150ms background",
		padding:"10px 16px 10px"
	},
	iconContainer: {
		position: "absolute",
		bottom: 16,
		left: 16,
	},
	innerBase: {
		height: "100%",
		// margin: "3px 12px 5px",
		overflow: "hidden",
		height: "calc(100% - 8px)"
	},
	resourceType: {
    fontSize: 12,
    lineHeight: "2.5",
    fontWeight: 300,
    marginBottom:15
	},
}

