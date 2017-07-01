import * as React from 'react'
import './style/Calendar.css'
import DatePicker from './DatePicker'
import * as Common from './Common'
import * as Moment from 'moment'

interface CalendarState extends Common.Datable {
}

function Input(props: Common.Datable) {
  return (
    <input 
      className="calendar-manual-input"
      type="text"
      readOnly = {true}
      value={Moment(props.date).format('LL')}
    />
  )
}

export default class Calendar extends React.Component<{}, CalendarState> {
  constructor() {
      super();
      this.state = {
        date: new Date(), 
      };
  }

  onDateChanged = (newValue: Date) => {
    this.setState({date: newValue})
  }

  render() {
    return (
      <div className="calendar">
        <div className="divTable">
          <div className="divTableRow">
            <div className="divTableCell">
              <Input date={this.state.date} />
            </div>
            <div className="divTableCell" >
              <button>C</button>
            </div>
          </div>
        </div>
        <DatePicker date={this.state.date} dateChanged={this.onDateChanged} />
      </div>
    )
  }
}