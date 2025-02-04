import { useMemo, useState } from "react";

export const Calendar = () => {

  const date = new Date()
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  const [calendarMonth, setCalendarMonth] = useState(currentMonth)
  const [calendarYear, setCalendarYear] = useState(currentYear)

  const dates = useMemo(() => calculateDaysInMonth(calendarYear, calendarMonth), [calendarMonth, calendarYear])


  function calculateDaysInMonth(year: number, month: number) {
    function getFirstSundayOfMonth(year: number, month: number) {
      console.log(year, month)
      const date = new Date(year, month, 1);
      date.setDate(date.getDate() - date.getDay());

      return date;
    }

    const dates: Date[] = []

    for (let i = 0; i < 35; i++) {
      const firstDate = getFirstSundayOfMonth(year, month)
      firstDate.setDate(firstDate.getDate() + i)
      dates.push(firstDate)
    }
    return dates;
  }

  function toggleMonth(move: "-" | "+") {
    if (move === "+") {
      if (calendarMonth === 11) {
        setCalendarMonth(0)
        setCalendarYear(calendarYear + 1)
        return;
      }
      setCalendarMonth(calendarMonth + 1)
      return;
    } if (move === "-") {
      if (calendarMonth === 0) {
        console.log("here")
        setCalendarMonth(11)
        setCalendarYear(calendarYear - 1)
        return;
      }
      setCalendarMonth(calendarMonth - 1)
      return;
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center w-full">
          <button onClick={() => toggleMonth("-")}>-</button>
          <h2>{months[calendarMonth]} {calendarYear}</h2>
          <button onClick={() => toggleMonth("+")}>+</button>
        </div>
        <div className="flex justify-between">
          {daysOfWeek.map((day) => <p className="inline-block w-10 m-1 text-center" key={day}>{day}</p>)}
        </div>
        <div className="grid grid-cols-7">
          {dates.map((dateItem, index) => (
            <Day
              key={index}
              date={dateItem}
              inCurrentMonth={dateItem.getMonth() === calendarMonth}
            />
          ))
          }
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

const Day = ({ date, inCurrentMonth }: { date: Date, inCurrentMonth: boolean }) => {

  return (
    <button className={`w-10 h-10 ${inCurrentMonth ? "bg-gray-100" : ""} rounded-full m-1 flex justify-center items-center`} key={date.getDate()}>{date.getDate()}</button>
  )
}
