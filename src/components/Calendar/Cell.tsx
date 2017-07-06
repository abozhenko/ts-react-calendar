import * as React from 'react'
import * as Common from './Common'

export interface CalendarCell {
  date: Date
  label: string
  isCurrentRange: boolean
  isSelected: boolean
  view: Common.CalendarViewMode
}

export interface CellProps extends CalendarCell {
  dateSelected: (newValue: Date) => void
}

export class Cell extends React.Component<CellProps, {}> {
  clickHandler = () => {
    let newDate = this.props.date
    this.props.dateSelected(newDate)
  }
  
  render() {
    let classes = 'datepicker-view-cell-data'
    if (this.props.isSelected) {
      classes += ' datepicker-view-cell-selected'
    }
    if (!this.props.isCurrentRange) {
      classes += ' datepicker-view-cell-aboverange'
    }
    if (this.props.view != Common.CalendarViewMode.Day) {
      classes += ' datepicker-view-cell-wide'
    }
    return (
      <div className='datepicker-view-cell-stretch-in-row'>
        <div className='datepicker-view-cell-align-vartical'>
          <div className={classes} onClick={this.clickHandler}>
            {this.props.label}
          </div>
        </div>
      </div>
      )
  }
}