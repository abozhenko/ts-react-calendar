export enum CalendarViewMode {
    Day = 1,
    Month,
    Year
}

export interface Datable {
  date: Date
}

export interface ViewMode {
  viewMode: CalendarViewMode
}
