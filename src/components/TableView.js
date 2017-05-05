import React, { Component } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { observer } from 'mobx-react'

import colors from '../styles/colors.js'


@Radium
export default class TableView extends Component {
	render() {
		const { resource, tab, isFavorite, lmIcon } = this.props,
					{ showFavorites, addToFavorites, removeFromFavorites } = this.props.store,
					itemURL = '/?id='+resource.id + (tab === '' ? '' : '&tab='+tab)

		const resourceCategories = resource.categories.map( (cat,i) => (
			<span key={i+cat+i}>{cat}{ i < (resource.categories.length - 1) ? " - " : null}</span>
		)),
		addFavorite = (
			<div style={[styles.favorite,styles.addFavorite]} onClick={addToFavorites.bind(this,resource.id)}>&#9734;</div>
		),
		removeFavorite = (
			<div style={[styles.favorite,styles.removeFavorite]} onClick={removeFromFavorites.bind(this,resource.id)}>&#9733;</div>				
		),
		lmPDF = (
			<a target="_blank" href={resource.lm_pdf} style={{paddingRight:15,height:46,lineHeight:"46px"}}>
				<img style={{verticalAlign:"middle"}} src={require('../assets/lm-circle-logo.svg')} alt=""/>
			</a>
		),
		googlePDF = (
			<a target="_blank" href={resource.google_pdf} style={{paddingRight:15,height:46,lineHeight:"46px"}}>
				<img style={{verticalAlign:"middle",height:28}} src={require('../assets/drive-icon.png')} alt=""/>
			</a>
		)
		return (
			<div key={resource.id} style={styles.containerBox} className="table">
				<Link style={styles.detailLink} to={itemURL}>
					<h3 style={styles.resourceTitle}>{resource.title}</h3>
					<span style={styles.resourceType}>{resourceCategories}</span>
					<div className="list-description" dangerouslySetInnerHTML={{__html:resource.description.substring(0,150).trim() + '...'}}></div>
					{isFavorite ? removeFavorite : addFavorite}
				</Link>
				<div style={styles.iconContainer}>
					{resource.lm_pdf === undefined ? (<div style={{width:40}}></div>) : lmPDF}{resource.google_pdf === "" ? (<div style={{width:43}}></div>) : googlePDF}
				</div>
			</div>
		)
	}
}

var styles = {
	containerBox: {
		height: 50,
		boxShadow: "0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)",		
		width: "100%",
		position: "relative",
		overflow: "hidden",
		display: "flex",
		borderBottom: "1px solid #e8e8e8",
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
		color:colors.secondary4,
		fontSize:18,
		paddingRight:20,
		marginBottom:0
	},
	favorite:{
    cursor: "pointer",
    height:24
	},
	addFavorite:{
    paddingRight:5,
		color:colors.gray7,
		marginTop:1
	},
	removeFavorite:{
    paddingRight:2,
		color:colors.secondary2,
		fontSize: 24,
		marginTop: -2
	},
	tagContainer: {
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
		padding:"10px 16px 10px",
		display:"flex"
	},
	iconContainer: {
		display:"flex",
	},
	innerBase: {
		display:"flex",
		overflow: "hidden",
		width:"100%",
	},
	resourceType: {
    fontSize: 12,
    fontWeight: 300,
    paddingTop:9,
    marginRight:20,
    whiteSpace:"nowrap",
		"@media (max-width: 768px)": {
			display:"none"
		}    
	},
}

