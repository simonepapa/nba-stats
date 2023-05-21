import Link from "next/link"
import { getDays } from "../utils/utils"

const SchedulePage = () => {
  const days = getDays()

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto">
      <h1 className="font-bold text-3xl mb-2">NBA Schedule</h1>
      <div className="flex justify-evenly">
        {days.map((day, index) => {
          return (
            <Link
              key={`${day.getFullYear()}${day.getMonth()}${day.getDate()}`}
              href={`/schedule/${day.getFullYear()}${(
                "00" + day.getMonth()
              ).slice(-2)}${("00" + day.getDate()).slice(-2)}`}
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
