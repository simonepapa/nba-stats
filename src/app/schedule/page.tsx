"use client"

//async function fetchSchedule(date: Date = new Date()) {
//  const currentDay = String(date.getDate()).padStart(2, "0")
//  const currentMonth = String(date.getMonth() + 1).padStart(2, "0")
//  const currentYear = date.getFullYear()
//  const formattedDate = currentYear + "-" + currentMonth + "-" + currentDay
//
//  const response = await fetch(
//    `https://www.balldontlie.io/api/v1/games?start_date=${formattedDate}&end_date=${formattedDate}`,
//    {
//      next: {
//        revalidate: 86400, // 24 hours
//      },
//    }
//  )
//  const schedule = await response.json()
//
//  return schedule
//}

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

// Variable to decide whether to go forwards or backwards (dates)
enum Direction {
  Backwards = "Backwards",
  Forwards = "Forwards",
}

/**
 * Given a day, a direction and a number, returns the days plus/minus a number of days
 *
 * @param {number} direction The direction to move to.
 * @param {number} moveFor The number of days to move for.
 * @param {number} startDate Optional, the starting date. By default it's today
 * @return {number} d The startDate plus/minus a number of days
 */
const getADay = (
  direction: Direction,
  moveFor: number,
  startDate: Date = new Date()
) => {
  let d = new Date(startDate)
  direction === "Backwards"
    ? d.setDate(startDate.getDate() - moveFor)
    : d.setDate(startDate.getDate() + moveFor)
  return d
}

const SchedulePage = () => {
  const [days, setDays] = useState<Date[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const dateArray = []

    if (
      searchParams.get("year") === null ||
      searchParams.get("month") === null ||
      searchParams.get("day") === null
    ) {
      const startDay = new Date()
      for (let i = 2; i >= 1; i--) {
        const previousDay = getADay(Direction.Backwards, i)
        dateArray.push(previousDay)
      }
      dateArray.push(startDay)
      for (let i = 1; i <= 2; i++) {
        const nextDay = getADay(Direction.Forwards, i)
        dateArray.push(nextDay)
      }
    } else {
      const year =
        searchParams.get("year") !== null
          ? parseInt(searchParams.get("year"))
          : 0
      const month =
        searchParams.get("month") !== null
          ? parseInt(searchParams.get("month"))
          : 0
      const day =
        searchParams.get("day") !== null ? parseInt(searchParams.get("day")) : 0

      const startDay = new Date(year, month, day)
      for (let i = 2; i >= 1; i--) {
        const previousDay = getADay(Direction.Backwards, i, startDay)
        dateArray.push(previousDay)
      }
      dateArray.push(startDay)
      for (let i = 1; i <= 2; i++) {
        const nextDay = getADay(Direction.Forwards, i, startDay)
        dateArray.push(nextDay)
      }
    }

    setDays(dateArray)
  }, [searchParams])

  //const schedule = await fetchSchedule()

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto">
      <h1 className="font-bold text-3xl mb-2">NBA Schedule</h1>
      <div className="flex justify-evenly">
        {days.map((day, index) => {
          return (
            <Link
              key={`${day.getFullYear()}${day.getMonth()}${day.getDate()}`}
              href={{
                pathname: "/schedule",
                query: {
                  year: day.getFullYear(),
                  month: day.getMonth(),
                  day: day.getDate(),
                },
              }}
              className="flex flex-col items-center"
            >
              <p
                className={`${
                  index === 2 ? "font-bold" : ""
                } uppercase text-lg leading-4`}
              >
                {day.toLocaleString("en-GB", { month: "short" })}
              </p>
              <p className={index === 2 ? "font-bold" : ""}>
                {day.toLocaleString("en-GB", { weekday: "short" })}{" "}
                {day.getDate()}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default SchedulePage
