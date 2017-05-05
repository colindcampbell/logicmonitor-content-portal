import React from 'react'
import { Link } from 'react-router';
import '../styles/navigation.scss'
import { observer } from 'mobx-react'
import Radium from 'radium'

import colors from '../styles/colors'

@observer
@Radium
export default class Layout extends React.Component {
  filter(e) {
    this.props.resourceStore.filter = e.target.value
  }
  clearFilter(e){
  	this.focusInput()
  	this.props.resourceStore.filter = ""
  }
  focusInput(){
  	document.getElementById("search-input").focus();
  }
	render(){
		const user = this.props.currentUser,
					{filter, setTab} = this.props.resourceStore
		return (
			<header style={styles.containerStyle}>
				<Link onClick={setTab.bind(this, "")} to="/"><img style={styles.logoImg} src={require('../assets/LM_ICP_logo.svg')} alt="LogicMonitor ICP"/></Link>
				<span style={styles.mobileTitle}>LM ICP</span>
				<div style={styles.searchContainer}>
					<div style={styles.inputContainer}>
						<span onClick={this.focusInput.bind(this)} style={styles.searchIcon}>&#9906;</span>
						<input id="search-input" style={styles.input} placeholder="Search" type="text" value={filter} onChange={this.filter.bind(this)} />
						{filter === "" ? null : <span onClick={this.clearFilter.bind(this)} style={styles.clearText}>✕</span>}
					</div>
					<div style={styles.userItem}>Hello, {user.name}</div>
					<div style={styles.userItem}><img style={styles.avatar} src={user.avatarURL} alt={user.name}/></div>
				</div>
			</header>
		);
	}
}

var styles = {
	containerStyle: {
		position: 'relative',
		height: 56,
		background: colors.secondary4,
		zIndex:1
	},
	inputContainer:{
		position:"relative",
		flex:"1",
		margin: "0 40px",
		height: "36px",
		"@media (max-width: 768px)": {
			margin: "0 18px 0 0"
		}
	},
	searchIcon:{
		position:"absolute",
		transform:"rotate(-45deg)",
		left:15,
		color:colors.gray8,
		fontSize:22,
		"@media (max-width: 768px)": {
			display:"none"
		}		
	},
	clearText:{
		position:"absolute",
		right:15,
		color:colors.gray8,
		fontSize:16,
		cursor:"pointer",
		lineHeight:"36px",
		marginTop:10
	},
	input: {
		fontFamily: 'Avenir',
		fontWeight: 200,
    padding: "2px 6px 0 41px",
    backgroundColor: colors.secondary4a,
    border:"none",
    borderRadius: 2,
    color: "white",
    height: "36px",
    transition: "all 200ms",
    fontSize: 16,
    width:"100%",
    ":hover":{
    	backgroundColor: colors.secondary4b
    },
		"@media (max-width: 768px)": {
			padding: "2px 10px 0 10px",
		}    
	},
	searchContainer: {
		height: 56,
    marginLeft: 260,
    marginRight:10,
    overflow: 'hidden',
    lineHeight: "56px",
    verticalAlign: "middle",
    display:"flex",
    position: "relative",
    "@media (max-width: 768px)": {
    	marginLeft:155,
    	marginRight:0
    }
	},
	logoImg: {
		float: 'left',
		height: 28,
		marginTop: 14,
		marginLeft: 30,
		"@media (max-width: 768px)": {
			display:"none"
		}
	},
	userItem: {
		marginRight: 20,
		color: "white",
		"@media (max-width: 768px)": {
      display: 'none'
    },		
	},
	avatar:{
		height:32,
		borderRadius: "100%",
		marginTop:12,

	},
	mobileTitle:{
		display:"none",
		color:"#ffffff",
		position:"absolute",
		fontSize:23,
		left:61,
		top:14,
		"@media (max-width: 768px)": {
			display:"initial"
		}
	}
}