import React, { Component } from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { observer } from 'mobx-react'

import dateFormat from 'dateformat'

import Comment from './Comment'
import Button from './Button'

import colors from '../styles/colors.js'
import layout from '../styles/layout.js'


@observer
@Radium
export default class SingleView extends Component {
	constructor(props){
		super(props)
		if (props.resource.video_id !== "") {
      const wistiaScript1 = document.createElement("script")
      wistiaScript1.src = "//fast.wistia.com/embed/medias/"+props.resource.video_id+".jsonp"
      wistiaScript1.async = true
      document.body.appendChild(wistiaScript1)

      if (!document.getElementById('wistia-embed')) {
		    const wistiaScript = document.createElement("script")
		    wistiaScript.src = "//fast.wistia.com/assets/external/E-v1.js"
		    wistiaScript.async = true
		    wistiaScript.id = "wistia-embed"
		    document.body.appendChild(wistiaScript)
      }
		}
	}
	componentWillMount() {
		this.props.resource.createRef()
	}
	componentWillUnmount() {
		this.props.resource.destroyRef()
	}
	render() {
		const { resource, store, tab, isFavorite } = this.props,
					returnURL = '/' + (tab === '' ? '' : '?tab='+tab)

		const catList = resource.categories.map( (cat,i) => (
			<Link key={"cat"+resource.id+i} to={returnURL}>
				<Button key={"single-"+cat+i} click={store.swapCategoryList.bind(this,cat)} value={cat} kind="light"/>
			</Link>
		)),
		tagList = resource.tags.map( (tag, i) => (
			<Link key={"tag"+resource.id+i} to={returnURL}>
				<Button key={tag+i+resource.id} click={store.swapTagList.bind(this, tag)} value={tag.split('+')[0]} kind="light"/>
			</Link>
		)),
		addFavorite = (
			<div style={[styles.favoriteStar,styles.addFavorite]} onClick={store.addToFavorites.bind(this,resource.id)}>&#9734;</div>
		),
		removeFavorite = (
			<Link style={styles.removeFavorite} onClick={store.removeFromFavorites.bind(this,resource.id)} to={returnURL}>&#9733;</Link>
		),
		video = (
			<div className={"wistia_embed wistia_async_"+resource.video_id} style={{height:"calc(100% - 80px)",minHeight:200,maxHeight:400,width:"100%",marginBottom:10}}>&nbsp;</div>
		),
		comments = resource.comments.map(comment =>(
			<Comment comment={comment} resource={resource} key={comment.key}/>
		)),
		imgPreview = resource.image === undefined ? null : (
			<img src={resource.image} style={{width:"100%",height:"auto",border:"1px solid #999999",display:"block",marginBottom:"15px"}} alt=""/>
		),
		lmPDF = resource.lm_pdf === undefined ? null :(
			<a target="_blank" style={styles.fileLink}href={resource.lm_pdf}>
				<img style={[styles.linkIcon,{marginBottom:-19}]} src={require('../assets/lm-circle-logo.svg')} alt=""/>
			</a>
		),
		googlePDF = resource.google_pdf === "" ? null : (
			<a target="_blank" style={styles.fileLink} href={resource.google_pdf}>
				<img style={[styles.linkIcon,{marginBottom:-15}]} src={require('../assets/drive-icon.svg')} alt=""/>
			</a>
		)
		return (
			<div style={[styles.screenFill, styles.container]}>
				<Link to="/"><div style={[styles.screenFill,styles.backdrop]}></div></Link>
				<div style={[layout.horizontalCenter, styles.contentContainer]}>
					<h2 style={styles.title} title={resource.title}>{isFavorite ? removeFavorite : addFavorite}{resource.title}</h2>
					<div style={styles.content}>
						<h3 style={{fontSize:"20px",marginBottom:15,marginTop:0}}>Created {dateFormat(resource.created,"mmm d, yyyy")} - Updated {dateFormat(resource.updated,"mmm d, yyyy")}</h3>
						{resource.video_id === "" ? imgPreview : video}
						<div className="single-description" dangerouslySetInnerHTML={{__html:resource.description}}>
						</div>
						<h3 style={{fontSize:"22px"}}>Resource Type</h3>
						{catList}
						{tagList.length>0 ? <h3 style={{fontSize:22,marginTop:10}}>Tags</h3> : null}
						{tagList}
						<h3 style={{fontSize:22,marginBottom:10,marginTop:10}}>Files</h3>
						{lmPDF}{googlePDF}
					</div>
					<Link to={returnURL} style={styles.close}>&#x2715;</Link>
					<div style={styles.comments}>
						<ul style={styles.commentContainer}>
							{comments}
						</ul>
					</div>
					<span style={styles.commentBG}></span>
          <form style={styles.form} onSubmit={this.handleMessageCreate.bind(this)}>
          	<input style={styles.input} type="text" placeholder="Add a comment" ref="newMessage" />
          </form>
				</div>
			</div>
		)
	}

	handleMessageCreate(e){
		e.preventDefault()
    const newMessage = this.refs.newMessage
    const message = newMessage.value
    if (message === "") { return }
    this.props.resource.addComment(message)
    this.refs.newMessage.value = ""
	}
}

var styles = {
	screenFill: {
		position: "fixed",
		left: 0,
		right: 0,
		top:0,
		bottom:0
	},
	container :{
		zIndex: "1000"
	},
	overlay:{
    position: "absolute",
    top: 0,
    left: 0,
    bottom:0,
    width: "100%",
    height: "calc(100% - 5px)",
    background: colors.gray3,
    opacity:".6",
    ":hover":{
    	background: colors.gray2
    }
	},
	favoriteStar: {
		position: "absolute",
		left:12,
		transform:"translateY(-50%)",
		top:"50%",
	},
	addFavorite: {
		color:colors.gray5,
		fontSize: 22,
		cursor: "pointer"
	},
	removeFavorite: {
		color: colors.secondary2,
		textDecoration: "none",
		fontSize: 24,
		position: "absolute",
		left:12,
		top:"50%",
		transform:"translateY(-50%)"	
	},
	backdrop: {
		zIndex: "1000",
		position: "absolute",
		opacity: "0.6",
		background: colors.gray1
	},
	contentContainer: {
		top:"10%",
		bottom:"10%",
		zIndex: "1001",
		background: "white",
		width: "90%",
		maxWidth: 900,
		minWidth: 500,
		maxHeight: 800,
		minHeight: 200,
		overflow:"hidden",
		borderRadius: 2,
		"@media (max-width: 768px)": {
      minWidth: "initial",
      maxHeight: "none",
      top:"5%",
      bottom:"5%",
      left:"5%",
      right:"5%",
      width:"auto",
      transform:"none"
    }   
	},
	content: {
		position: "absolute",
		marginTop: "60px",
		padding: "15px 15px 30px 15px",
		bottom: 0,
		top:0,
		left:0,
		right:250,
		overflowY: "auto",
		"@media (max-width: 768px)": {
			right:0
		}		
	},
	form:{
		position:"absolute",
		top:67,
		right:5,
		width:240
	},
	commentBG:{
		position:"absolute",
		background:colors.secondary3,
		top:60,
		right:0,
		bottom:0,
		width:250,
		boxShadow: "rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px",
		"@media (max-width: 768px)": {
			display:"none"
		}
	},
	input: {
		fontFamily: 'Avenir',
		fontWeight: 200,
    padding: "2px 6px 0 6px",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: colors.gray9,
    borderWidth: 1,
    borderRadius: 2,
    margin: 0,
    color: "rgba(0,0,0,0.75)",
    width: "100%",
    height: "40px",
    transition: "all 0.15s linear",
    fontSize: 16,
		"@media (max-width: 768px)": {
			display:"none"
		}		    
	},
	commentContainer:{
    display: "flex",
    flexDirection: "column-reverse",
    position: "absolute",
    left: 10,
    right: 10,
    padding: 0,
		top:3,
		zIndex:1,
		"@media (max-width: 768px)": {
			display:"none"
		}		
 	},
	comments: {
		overflowY:"auto",
		position: "absolute",
		top: 110,
		bottom: 0,
		right:0,
		width: 250,
		padding: "0 10px 10px 10px",
		"@media (max-width: 768px)": {
			display:"none"
		}		
	},
	close:{
		textDecoration: "none",
		fontSize: 20,
		position: "absolute",
		top:0,
		right: 2,
		color: colors.gray6,
		padding: "5px 10px",
		zIndex:"2"
	},
	title: {
		color: colors.primary1,
		fontSize: 24,
		fontWeight: 200,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		padding: "15px 30px 15px 40px",
		background: colors.gray10,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
		cursor: "help",
		margin:0,
		height:60,
		boxShadow: "rgba(0, 0, 0, 0.137255) 0px 0px 4px, rgba(0, 0, 0, 0.278431) 0px 4px 8px",
		zIndex: "1",
	},
	fileLink:{
		background:colors.primary1,
		padding:"20px 5px",
		borderRadius:2,
		marginRight: 5,
		lineHeight: "30px"
	},
	linkIcon:{
		width:50,
	},
	icon:{
		width:14,
		marginRight:8
	}
}
