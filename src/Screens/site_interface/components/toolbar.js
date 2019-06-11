import React from 'react'
import Button from '@material-ui/core/Button'
import Toolbar from 'react-big-calendar/lib/Toolbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../styles/style.css'

export default class CalendarToolbar extends Toolbar {
	componentDidMount() {
		const view = this.props.view;
	}

	render() {
		return (
			<div style={{position: 'relative'}}>
				<div className="rbc-btn-group navButtons">
					<Button style={{color:'white'}} variant="outlined" color="primary" onClick={() => this.navigate('TODAY')}>Today</Button>
					<Button style={{color:'white'}} variant="outlined" color="primary" onClick={() => this.navigate('PREV')}>Back</Button>
          <Button style={{color:'white'}} variant="outlined" color="primary" onClick={() => this.navigate('NEXT')}>Next</Button>
				</div>
				<div className="rbc-toolbar-label">{this.props.label}</div>
				<div className="rbc-btn-group">
					<Button style={{color:'white'}} variant="outlined" color="primary" onClick={this.view.bind(null, 'day')}>Day</Button>
					<Button style={{color:'white'}} variant="outlined" color="primary" onClick={this.view.bind(null, 'agenda')}>List</Button>
				</div>
			</div>
		)
	}
}