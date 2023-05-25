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
 * @return {Date} d The startDate plus/minus a number of days
 */
export const getADay = (
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

/**
 * Returns an array of dates
 * @param {number} startDate Optional, the starting date. By default it's today
 * @return {Date[]} dates The array containing all the dates
 */
export const getDays = (startDate: Date = new Date()) => {
  const dates = []

  for (let i = 2; i >= 1; i--) {
    const previousDay = getADay(Direction.Backwards, i, startDate)
    dates.push(previousDay)
  }
  dates.push(startDate)
  for (let i = 1; i <= 2; i++) {
    const nextDay = getADay(Direction.Forwards, i, startDate)
    dates.push(nextDay)
  }

  return dates
}
