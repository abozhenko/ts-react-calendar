import * as React from 'react'
import DatePickerView from './DatePickerView'
import {DatePickerViewProps} from './DatePickerView'
import DatePickerHeader from './DatePickerHeader'
import {DatePickerHeaderProps} from './DatePickerHeader'
import * as Common from './Common'
import * as Moment from 'moment'

interface DatePickerState extends Common.ViewMode {
}

export interface DatePickerProp extends Common.Datable {
    dateChanged: (newValue: Date) => void
}

export default class DatePicker extends React.Component<DatePickerProp, DatePickerState> {
  constructor() {
    super();
    this.state = {
      viewMode: Common.CalendarViewMode.Day
    }
  }

  onViewModeChanged = (newValue: Common.CalendarViewMode) => {
    this.updateViewMode(newValue)
  }

  updateViewMode(newValue: Common.CalendarViewMode) {
    this.setState({viewMode: newValue})
  }

  onNavigated = (direction: 1|-1) => {
    let m = Moment(this.props.date)

    let navigationSettings: {amount: number, unit: 'months'|'years'}[] = [
      {amount: 1, unit: 'months'},
      {amount: 1, unit: 'years'},
      {amount: 10, unit: 'years'},
    ]
    let data = navigationSettings[this.state.viewMode - Common.CalendarViewMode.Day]
    
    if (direction > 0) {
      m.add(data.amount, data.unit)
    } else {
      m.subtract(data.amount, data.unit)
    }
   
    this.props.dateChanged(m.toDate())
  }

  onDateSelected = (newValue: Date) => {
    if (this.state.viewMode > Common.CalendarViewMode.Day){
      this.updateViewMode(this.state.viewMode - 1)
    }

    this.props.dateChanged(newValue)
  }

  onTodayClick = () => {
    this.props.dateChanged(new Date())
  }

  render() {
    let headerProps: DatePickerHeaderProps = {
      date: this.props.date,
      viewMode: this.state.viewMode,
      viewModeChanged: this.onViewModeChanged,
      navigated: this.onNavigated
    }

    let viewProps: DatePickerViewProps = {
      date: this.props.date,
      viewMode: this.state.viewMode,
      dateSelected: this.onDateSelected
    }
    return (
      <div className="dateSelector">
        <DatePickerHeader {... headerProps}/>
        <DatePickerView {... viewProps}/>
        <div><button onClick={this.onTodayClick}>Today</button></div>
      </div>
    ) 
  }
}