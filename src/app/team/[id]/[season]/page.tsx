import ScheduleGame from "@/app/components/ScheduleGame"
import Link from "next/link"

interface Props {
  params?: any
}

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

async function fetchTeamRegularSchedule(id: string, season: string) {
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

async function fetchTeamPostSchedule(id: string, season: string) {
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

const TeamScheduleSeasonPage = async ({ params: { id, season } }: Props) => {
  const team = await fetchTeamInfo(id)
  const regularSchedule = await fetchTeamRegularSchedule(id, season)
  const postSchedule = await fetchTeamPostSchedule(id, season)

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto max-w-7xl">
      <h1 className="font-bold text-3xl mb-2">
        {team.full_name}
      </h1>
      <p><strong>Abbreviation</strong>: {team.abbreviation}</p>
      <p><strong>City</strong>: {team.city}</p>
      <p><strong>Division</strong>: {team.division}</p>
      <p><strong>Conference</strong>: {team.conference}</p>
      <div className="flex justify-evenly max-w-xl mx-auto">
        <Link href={`/team/${id}/${parseInt(season) - 1}`} className="text-xl">{parseInt(season) - 1}</Link>
        <p className="text-xl font-bold">{season}</p>
        <Link href={`/team/${id}/${parseInt(season) + 1}`} className="text-xl">{parseInt(season) + 1}</Link>
      </div>
      <p className="font-bold text-xl uppercase mt-5 mb-2">{parseInt(season)} Regular Season Schedule</p>
      <div className="flex flex-wrap">
        {regularSchedule.data.map((game: any) => {
          return <ScheduleGame key={game.id} game={game} />
        })}
      </div>
      <p className="font-bold text-xl uppercase mt-5 mb-2">{parseInt(season)} Playoffs Schedule</p>
      <div className="flex flex-wrap">
        {postSchedule.data.map((game: any) => {
          return <ScheduleGame key={game.id} game={game} />
        })}
      </div>
    </div>
  )
}
export default TeamScheduleSeasonPage
