import ScheduleGame from "@/app/components/ScheduleGame"
import Link from "next/link"
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi"

async function fetchTeamInfo(id: string) {
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/teams/${id}`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const team = await response.json()

  return team
}

async function fetchTeamRegularSchedule(id: string) {
  let season = new Date().getFullYear() - 1 // current season stats are not available
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/games?seasons[]=${season}&team_ids[]=${id}&per_page=100&postseason=false`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const schedule = await response.json()

  return schedule
}

async function fetchTeamPostSchedule(id: string) {
  let season = new Date().getFullYear() - 1 // current season stats are not available
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/games?seasons[]=${season}&team_ids[]=${id}&per_page=100&postseason=true`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const schedule = await response.json()

  return schedule
}

const TeamPage = async ({ params: { id } }: Props) => {
  const team = await fetchTeamInfo(id)
  const regularSchedule = await fetchTeamRegularSchedule(id)
  const postSchedule = await fetchTeamPostSchedule(id)

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto max-w-7xl">
      <h1 className="font-bold text-3xl mb-2">{team.full_name}</h1>
      <p>
        <strong>Abbreviation</strong>: {team.abbreviation}
      </p>
      <p>
        <strong>City</strong>: {team.city}
      </p>
      <p>
        <strong>Division</strong>: {team.division}
      </p>
      <p>
        <strong>Conference</strong>: {team.conference}
      </p>
      <div className="flex justify-evenly max-w-xl mx-auto">
        <div className="flex items-center">
          <Link
            href={`/team/${id}/${new Date().getFullYear() - 2}`}
            className="text-xl"
          >
            <HiOutlineArrowNarrowLeft className="me-8 transition hover:scale-125" />
          </Link>
          <Link
            href={`/team/${id}/${new Date().getFullYear() - 2}`}
            className="text-xl"
          >
            {new Date().getFullYear() - 2}
          </Link>
        </div>
        <p className="text-xl font-bold">{new Date().getFullYear() - 1}</p>
        <div className="flex items-center">
          <Link
            href={`/team/${id}/${new Date().getFullYear()}`}
            className="text-xl"
          >
            {new Date().getFullYear()}
          </Link>
          <Link
            href={`/team/${id}/${new Date().getFullYear()}`}
            className="text-xl"
          >
            <HiOutlineArrowNarrowRight className="ms-8 transition hover:scale-125" />
          </Link>
        </div>
      </div>
      <p className="font-bold text-xl uppercase mt-5 mb-2">
        {new Date().getFullYear() - 1} Regular Season Schedule
      </p>
      <div className="flex flex-wrap">
        {regularSchedule.data.map((game: ScheduleGame) => {
          return <ScheduleGame key={game.id} game={game} />
        })}
      </div>
      <p className="font-bold text-xl uppercase mt-5 mb-2">
        {new Date().getFullYear() - 1} Playoffs Schedule
      </p>
      <div className="flex flex-wrap">
        {postSchedule.data.map((game: ScheduleGame) => {
          return <ScheduleGame key={game.id} game={game} />
        })}
      </div>
    </div>
  )
}
export default TeamPage
