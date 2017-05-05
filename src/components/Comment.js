import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'

import colors from '../styles/colors.js'


@Radium
@observer
export default class Button extends Component {
	constructor(){
		super()
		this.state = {showDelete:false}
	}
	showDelete(){
		this.setState({showDelete:true})
	}
	hideDelete(){
		this.setState({showDelete:false})
	}
	render() {
		const {comment, resource} = this.props,
					deleteComment = <span onMouseEnter={this.showDelete.bind(this)} onClick={resource.removeComment.bind(this,comment.key)} style={styles.deleteMessage}>&#x2715;</span>,
					isCurrentUser = comment.userID === resource.store.current_user.id ? true : false,
					userStyle = isCurrentUser ? "left" : "right",
					commentBG = isCurrentUser ? "default" : "secondary",
					userImage = <img style={styles.avatar} src={comment.userAvatar} alt={comment.userName}/>

		return (
			<li style={[styles.comment,styles[userStyle]]}>
				{isCurrentUser ? userImage : null}
				<span onMouseEnter={this.showDelete.bind(this)} onMouseOut={this.hideDelete.bind(this)} style={[styles.message,styles[commentBG]]}>
					{comment.message} {(isCurrentUser && this.state.showDelete) ? deleteComment : null }
				</span>
				{!isCurrentUser ? userImage : null}
				<p style={styles.userName}>
					{comment.userName} &bull; {comment.timestamp}
				</p>
			</li>
		)
	}
}

var styles = {
	comment:{
		listStyle:"none",
		marginTop:6,
		marginBottom:30,
		position:"relative",
		width:"100%"
	},
	right:{
		textAlign:"right"
	},
	avatar:{
		width:"18%",
		height:"auto",
		display:"inline-block",
		verticalAlign:"bottom",
		borderRadius:"50%"
	},
	message:{
		maxWidth:"calc(82% - 14px)",
		marginLeft:4,
		marginRight:4,
		borderRadius:2,
		padding:"7px 10px",
		color:"white",
		display:"inline-block",
		position:"relative"
	},
	default:{
		background:colors.primary1,
	},
	secondary:{
		background:colors.secondary4a,
		// color:"black"
	},
	userName:{
		position: "absolute",
    bottom: -25,
    width: 230,
    margin: 0,
    whiteSpace: "nowrap",
    fontSize:15
	},
	deleteMessage:{
		position:"absolute",
		top:-7,
		right:-7,
		width:20,
		height:20,
		color:"white",
		background:colors.primary0,
		borderRadius:"50%",
		fontSize:10,
		textAlign:"center",
		lineHeight:"20px",
		cursor:"pointer"
	}
}
