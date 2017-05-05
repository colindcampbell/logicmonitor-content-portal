import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Radium from 'radium'
import { Link } from 'react-router'

import SingleView from './SingleView'
import GridView from './GridView'
import TableView from './TableView'

import colors from '../styles/colors.js'

@observer
@Radium
export default class ResourceItem extends Component {
	shouldComponentUpdate(nextProps) {
		let update = false,
				id = this.props.item.id.toString()
		if(nextProps.urlID === undefined && this.props.urlID === id){
			update = true
		}
		if (nextProps.urlID === id) {
			update = true
		}
		return update
	}
	render() {
		const resource = this.props.item,
				  {navTab, favorites, activeView} = this.props.store,
					inFilter = favorites.filter(fave => (
						fave.id === resource.id
					)),
					isFavorite = inFilter.length === 1 ? true : false,
					isInternal = resource.categories.map(cat => cat === "Internal"),
					lmIcon = isInternal.length === 1 ? "" : require('../assets/lm-circle-logo.svg')


		const gridView = <GridView isFavorite={isFavorite} tab={navTab} resource={resource} store={this.props.store} />,
		tableView = <TableView isFavorite={isFavorite} tab={navTab} resource={resource} store={this.props.store} />,
		itemView = this.props.urlID === resource.id.toString() ? <SingleView isFavorite={isFavorite} tab={navTab} resource={resource} store={this.props.store} lmIcon={lmIcon}/> : null

		return (
			<li style={activeView === "grid" ? styles.itemContainer : {width:"100%"}} >
				{activeView === "grid" ? gridView : tableView}{itemView}
			</li>
		);
	}
}

var styles={
	itemContainer: {
		width:"100%",
		"@media (min-width: 1120px)": {
      width: '50%'
    },
		"@media (min-width: 1680px)": {
      width: '33.3%'
    },
		"@media (min-width: 2160px)": {
      width: '25%'
    },
	}
}

