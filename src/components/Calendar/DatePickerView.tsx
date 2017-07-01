import * as Moment from 'moment'
import * as React from 'react'
import * as Common from './Common'
import {CalendarCell} from './Cell'
import Cell from './Cell'

export interface DatePickerViewProps extends Common.Datable, Common.ViewMode {
  dateSelected: (date: Date) => void
}

export default class DatePickerView extends React.Component<DatePickerViewProps, {}> {
  render() {
    let header = undefined;
    if (this.props.viewMode === Common.CalendarViewMode.Day) {
      header = this.generateWeekDays().map((day, ind) => {
        return (
          <div className="divTableCell" key={ind}> 
            {day}
          </div>
        )
      })
    }
    
    let content: CalendarCell[][] = []
    if (this.props.viewMode === Common.CalendarViewMode.Day) {
      content = this.getDates()
    } else if (this.props.viewMode === Common.CalendarViewMode.Month) {
      content = this.getMonths()
    } else {
      content = this.getYears()
    }

    let body = content.map(row => {
      let rowContent = row.map( day => (<Cell  {... day} dateSelected={this.props.dateSelected}/>))
      return (
        <div className="divTableRow">
          {rowContent}
        </div>
      )
    })

    return (
      <div className="divTable">
        <div className="divTableRow">
          {header}
        </div>
        {body}
      </div>
    )
  }

  private generateWeekDays() {
    let today = Moment()
    return [0, 1, 2, 3, 4, 5, 6].map(i => today.weekday(i).format('dd'))
  }

  private getDates(): CalendarCell[][] {
    let currDate = Moment(this.props.date)
    let currMonth = currDate.month();
    let firstViewDay = currDate.clone().startOf('month').weekday(0);
    let lastViewDay = currDate.clone().endOf('month').weekday(6);
    let result: CalendarCell[][] = []

    let day = firstViewDay.clone()
    let row: CalendarCell[] = []

    while (day.isBefore(lastViewDay)) {
      if (day.weekday() === 0) {
        row = [];
        result.push(row)
      }
      let cell = {
        date: day.toDate(),
        label: day.date().toString(),
        isCurrentRange: day.month() === currMonth,
        isSelected: day.month() === currMonth && day.date() === currDate.date()
      }
      row.push(cell)
      day.add(1, 'day')
    }
    return result
  }

  private getMonths(): CalendarCell[][] {
    let curr = Moment(this.props.date)
    let result: CalendarCell[][] = []
    let row: CalendarCell[] = []
    ;[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(monthNum => {
      if (monthNum % 4 === 0) {
          row = []
          result.push(row)
      }
      let monthToShow = curr.clone().month(monthNum)
      row.push({
        date: monthToShow.toDate(),
        isSelected: curr.month() === monthNum,
        isCurrentRange: true,
        label: monthToShow.format('MMM')
      })
    })
    
    return result
  }

  private getYears(): CalendarCell[][] {
    let curr = Moment(this.props.date)
    let zeroYear = curr.clone().year(Math.floor(curr.year() / 10) * 10)
    let result: CalendarCell[][] = []
    let row: CalendarCell[] = []
    ;[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(yearOffset => {
      if ((yearOffset + 1) % 4 === 0) {
          row = []
          result.push(row)
      }
      let currYear = zeroYear.year() + yearOffset;
      let yearToShow = zeroYear.clone().year(currYear)
      row.push({
        date: yearToShow.toDate(),
        isSelected: curr.year() === yearToShow.year(),
        isCurrentRange: yearOffset >= 0 && yearOffset < 10,
        label: yearToShow.format('YYYY')
      })
    })
    return result
  }
}