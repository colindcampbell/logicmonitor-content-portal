import React from 'react'
import { observer, autorun } from 'mobx-react'
import Radium from 'radium'

import ResourceItem from './ResourceItem'
import PageHeader from './PageHeader'
import Loader from './Loader'

import layout from '../styles/layout'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

@observer
@Radium
export default class ResourceList extends React.Component {
	render() {
		const { filteredResources, loading } = this.props.store

	  const resourceList = filteredResources ? filteredResources.map(resource => (
	  	<ResourceItem urlID={this.props.id} store={this.props.store} key={resource.id} item={resource} />
	  )) : null

	  const loader = [
			<ReactCSSTransitionGroup 
				transitionName="content"
				transitionEnterTimeout={0}
				transitionLeaveTimeout={0}
				transitionAppearTimeout={0}
				transitionAppear={true} key={'loader'}>			
	  		<Loader />
      </ReactCSSTransitionGroup>
	  ]

		return (
			<div style={{height:"100%"}}>
				<PageHeader store={this.props.store}/>
				<ul style={styles.listContainer}>
					{loading ? loader : ( resourceList.length > 0 ? resourceList : <li style={layout.centerDiv}><h2>No Resources in Current View</h2></li> ) }
				</ul>
			</div>
		);
	}
}

var styles = {
	listContainer:{
		margin: 0,
		padding: "0 67px",
		listStyle: "none",
		verticalAlign: "baseline",
		display: "flex",
		alignContent: "flex-start",
		flexWrap: "wrap",
    overflowY: "auto",
    height:"calc(100% - 217px)",
    "@media (max-width: 768px)": {
    	padding:"0 7px"
    }
	}
}
