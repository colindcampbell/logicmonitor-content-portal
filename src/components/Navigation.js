import React from 'react';
import { Link } from 'react-router';
import '../styles/navigation.scss';
import TechDataSheet from '../assets/TechDataSheetSVG'
import SalesEnablement from '../assets/SalesEnablementSVG'
import AllContent from '../assets/AllContentSVG'
import CaseStudy from '../assets/CaseStudySVG'
import Internal from '../assets/InternalSVG'

import Radium from 'radium'
import colors from '../styles/colors'
import layout from '../styles/layout'

@Radium
export default class Navigation extends React.Component {
	getKind(activeTab, tab) {
		return activeTab === tab ? "active "+tab : ""
	}
	getColor(activeTab, tab) {
		return activeTab === tab ? colors.navGray : colors.gray5
	}
	render(){
		const {setTab, navTab} = this.props.resourceStore
		return (
			<nav style={styles.containerStyle}>
				<ul style={styles.linkContainer}>
					<li key="nav1" className={this.getKind(navTab, "")} style={styles.navItem}>
						<Link onClick={setTab.bind(this, "")} to="/" style={styles.navLink}>All Content</Link>
					</li>
					<li key="nav2" className={this.getKind(navTab, "sales-enablement")} style={styles.navItem}>
						<Link onClick={setTab.bind(this, "sales-enablement")} to="/?tab=sales-enablement" style={styles.navLink}>Sales Enablement</Link>
					</li>
					<li key="nav3" className={this.getKind(navTab, "technology-datasheets")} style={styles.navItem}>
						<Link onClick={setTab.bind(this, "technology-datasheets")} to="/?tab=technology-datasheets" style={styles.navLink}>Technology Data Sheets</Link>
					</li>
					<li key="nav4" className={this.getKind(navTab, "case-studies")} style={styles.navItem}>
						<Link onClick={setTab.bind(this, "case-studies")} to="/?tab=case-studies" style={styles.navLink}>Case Studies</Link>
					</li>
					<li key="nav5" className={this.getKind(navTab, "internal")} style={styles.navItem}>
						<Link onClick={setTab.bind(this, "internal")} to="/?tab=internal" style={styles.navLink}>LM Internal</Link>
					</li>					
				</ul>
			</nav>
		);
	}
}

var styles={
	containerStyle: {
		position: 'relative',
		height:48,
		width: '100%',
		overflow: "hidden",
		background: colors.secondary4,
		boxShadow:"0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)",
		// "@media (max-width: 768px)": {
  //     top:115
  //   }		
	},
	linkContainer:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"space-between"
	},
	navItem:{
		flexGrow: "1",
		position: "relative",
		cursor: "pointer",
		listStyle:"none",
		height: 48,
	},
	navLink: {
		fontSize: 12,
		fontWeight: "500",
		textTransform: "uppercase",
		textDecoration: "none",
		color: colors.gray8,
		textAlign: "center",
		lineHeight:"48px",
		":hover":{
			color: "#ffffff"
		}
	},
	icon:{
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%) scale(.75)"		
	},
}