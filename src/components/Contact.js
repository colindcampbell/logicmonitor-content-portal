import React, { Component } from 'react'
import Radium from 'radium'

import Clipboard from 'clipboard'
const clipboard = new Clipboard('.btn')

@Radium
export default class Contact extends Component {
  constructor(){
  	super()
  	this.state = {showCopy:0}
  }
  onClick(num) {
    this.setState({showCopy:num})
  }
  onMouseOut() {
  	setTimeout(() => {
  		this.setState({showCopy:0})
  	}, 1200)
  }
	render() {
		return (
			<div style={styles.contact}>
				<p style={{fontSize:13,marginBottom:5}}>Send questions and suggestions to:</p>
				<input style={[styles.input,{marginBottom:2}]} readOnly id="contact-maddie" value={this.state.showCopy === 1 ? "Copied!" : "madeline.stack@logicmonitor.com"} />
				<span style={styles.buttonContainer}>
					<button style={[styles.button,{margin:"0 0 4px -1px"}]} onClick={this.onClick.bind(this,1)} className="btn" readOnly data-clipboard-target="#contact-maddie" onMouseOut={this.onMouseOut.bind(this)}>
					   <img style={styles.clipboard} width="13" src={require('../assets/clipboard.svg')} alt="Copy to clipboard" />
					</button>
				</span>
				<input style={styles.input} readOnly id="contact-colin" value={this.state.showCopy === 2 ? "Copied!" : "colin.campbell@logicmonitor.com"} />
				<span style={styles.buttonContainer}>
					<button style={[styles.button,{margin:"-2px 0 0 -1px"}]} onClick={this.onClick.bind(this,2)} className="btn" readOnly data-clipboard-target="#contact-colin" onMouseOut={this.onMouseOut.bind(this)}>
					  <img style={styles.clipboard} width="13" src={require('../assets/clipboard.svg')} alt="Copy to clipboard" />
					</button>	
				</span>
			</div>
		);
	}
}

var styles = {
	contact:{
		position:"absolute",
		bottom:8,
		left:8,
		width:250,
		fontSize:13,
    // zIndex:3,
		lineHeight:"16px",
    "@media (max-width: 768px)": {
      display: 'none'
    },    
	},
	input:{
    padding: "4px 6px",
    fontSize: 12,
    color: "#333333",
    verticalAlign: "middle",
    backgroundColor: "white",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
    border: "1px solid #ccc",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.075)",
		borderRadius:"2px 0 0 2px",
		width:"calc(100% - 40px)"
	},
	buttonContainer:{
    width: "1%",
    verticalAlign: "middle",
	},
	button:{
		borderRadius: "0 2px 2px 0",
    position: "relative",
    display: "inline-block",
    padding: "3px 8px",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: "17px",
    color: "#333",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    cursor: "pointer",
    backgroundColor: "#eee",
    backgroundImage: "linear-gradient(#fcfcfc,#eee)",
    border: "1px solid #d5d5d5",
	},
	clipboard:{
    marginTop: -3,
    position: "relative",
    top: 3		
	}
}

