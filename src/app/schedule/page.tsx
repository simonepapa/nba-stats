import Link from "next/link"
import { getDays } from "../utils/utils"
import ScheduleGame from "../components/ScheduleGame"

async function fetchTodaysGames() {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const date = year+"-"+month+"-"+day
  
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/games?start_date=${date}&end_date=${date}`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const games = await response.json()

  return games
}

const SchedulePage = async () => {
  const days = getDays()
  const games = await fetchTodaysGames()

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto">
      <h1 className="font-bold text-3xl mb-2">NBA Schedule</h1>
      <div className="flex justify-evenly mb-8">
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
      <div className="flex flex-wrap">
        {games.data.map((game: any) => {
          return <ScheduleGame key={game.id} game={game} />
        })}
      </div>
    </div>
  )
}
export default SchedulePage
