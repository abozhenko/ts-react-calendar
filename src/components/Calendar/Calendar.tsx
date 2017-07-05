import * as React from 'react'
import './style/Calendar.css'
import DatePicker from './DatePicker'
import * as Common from './Common'
import * as Moment from 'moment'

interface CalendarState extends Common.Datable {
}

export interface CalendarProps {
  dateChanged?: (newValue: Date) => void
}

function Input(props: Common.Datable) {
  return (
    <input 
      className="calendar-header-input"
      type="text"
      readOnly = {true}
      value={Moment(props.date).format('LL')}
    />
  )
}

export default class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor() {
      super();
      this.state = {
        date: new Date(), 
      };
  }

  onDateChanged = (newValue: Date) => {
    this.setState({date: newValue})
    
    if (this.props.dateChanged) {
      this.props.dateChanged(newValue)
    }
  }

  render() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <Input date={this.state.date} />
          <div className="calendar-header-icon"></div>    
        </div>
        <DatePicker date={this.state.date} dateChanged={this.onDateChanged} />
      </div>
    )
  }
}