import * as React from 'react'

export interface CalendarCell {
  date: Date
  label: string
  isCurrentRange: boolean
  isSelected: boolean
}

export interface CellProps extends CalendarCell {
  dateSelected: (newValue: Date) => void
}

export default class Cell extends React.Component<CellProps, {}> {
  clickHandler = () => {
    let newDate = this.props.date
    this.props.dateSelected(newDate)
  }
  
  render() {
    let classes = 'datepicker-cell'
    if (this.props.isSelected) {
      classes += ' datepicker-cell-selected'
    }
    if (!this.props.isCurrentRange) {
      classes += ' datepicker-cell-aboverange'
    }
    return (
      <td className={classes} onClick={this.clickHandler}>
        {this.props.label}
      </td>
      )
  }
}