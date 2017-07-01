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
    let classes = 'divTableCell'
    if (this.props.isSelected) {
      classes += ' selected'
    }
    if (!this.props.isCurrentRange) {
      classes += ' grey'
    }
    return (
      <div className={classes}>
      <span onClick={this.clickHandler}>{this.props.label}</span>
      </div>
      )
  }
}