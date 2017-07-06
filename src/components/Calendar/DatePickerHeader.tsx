import * as React from 'react'
import * as Common from './Common'
import * as Moment from 'moment'

export interface DatePickerHeaderProps extends Common.Datable, Common.ViewMode {
  viewModeChanged: (newValue: Common.CalendarViewMode) => void,
  navigated: (direction: 1|-1) => void
}

export class DatePickerHeader extends React.Component<DatePickerHeaderProps, {}> {
  handleForward = () => {
    this.props.navigated(1)
  }

  handleBackward = () => {
    this.props.navigated(-1)
  }

  handleHeaderClick = () => {
    if (this.props.viewMode < Common.CalendarViewMode.Year) {
      this.props.viewModeChanged(this.props.viewMode + 1)
    }
  }

  getHeaderTextBasedOnViewMode(): string {
    let m = Moment(this.props.date)
    switch (this.props.viewMode) { 
      case Common.CalendarViewMode.Day: { 
          return m.format('MMMM YYYY')
      } 
      case Common.CalendarViewMode.Month: { 
          return m.format('YYYY') 
      }
      case Common.CalendarViewMode.Year: { 
          let yearFrom = Math.floor(m.year() / 10) * 10;
          let yearTo = Math.ceil(m.year() / 10) * 10;
          return `${yearFrom} - ${yearTo}`
      }  
      default: { 
          throw new RangeError(`${this.props.viewMode} is not supported by Calendar's header`) 
      } 
    }   
  }

  render() {
    return (
      <div className="datepicker-header">
          <span className="datepicker-header-nav-backward datepicker-clickable-area" onClick={this.handleBackward}>{'❮'}</span>
          <span className="datepicker-header-content datepicker-clickable-area" onClick={this.handleHeaderClick}>
            {this.getHeaderTextBasedOnViewMode()}
          </span>
          <span className="datepicker-header-nav-forward datepicker-clickable-area" onClick={this.handleForward}>{'❯'}</span>
      </div>
    ) 
  }
}