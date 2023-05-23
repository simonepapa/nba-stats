import Boxscore from "@/app/components/Boxscore/Boxscore"
import Link from "next/link"

interface Props {
  params?: any
}

async function fetchGame(id: string) {
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/games/${id}`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const game = await response.json()

  return game
}

async function fetchGameStats(id: string) {
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/stats?game_ids[]=${id}&per_page=50`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const stats = await response.json()

  return stats
}

async function fillTeams(gameid: string) {
  const stats = await fetchGameStats(gameid)
  const teams: { [key: string]: any } = {}

  // Fill 'teams' object with unique team IDs
  for (let i = 0; i < stats.data.length; i++) {
    if (!(stats.data[i].team.id in teams)) {
      teams[stats.data[i].team.id] = {
        players: {},
        team: stats.data[i].team,
      }
    }
  }
  // Put each player in his team
  stats.data.forEach((player: any) => {
    if (player.team.id in teams) {
      teams[player.team.id]["players"][player.id] = player
    }
  })

  return teams
}

const BoxscorePage = async ({ params: { gameid } }: Props) => {
  const game = await fetchGame(gameid)
  const teams = await fillTeams(gameid)

  return (
    <div className="bg-white rounded-md shadow-md py-2 w-fit mt-4 mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex items-center">
          <Link
            href={`/team/${game.visitor_team.id}`}
            className="text-lg sm:text-2xl w-56 sm:w-64 lg:w-fit lg:me-2 text-[#0000EE] hover:underline"
          >
            {game.visitor_team.full_name}
          </Link>
          <p
            className={`${
              game.visitor_team_score > game.home_team_score &&
              game.status === "Final"
                ? "font-bold"
                : ""
            } text-lg sm:text-2xl`}
          >
            {game.visitor_team_score}
          </p>
        </div>
        <p className="text-lg sm:text-2xl mx-4 hidden lg:block">-</p>
        <div className="flex items-center">
          <p
            className={`${
              game.visitor_team_score < game.home_team_score &&
              game.status === "Final"
                ? "font-bold"
                : ""
            } text-lg sm:text-2xl order-2 lg:order-1`}
          >
            {game.home_team_score}
          </p>
          <Link
            href={`/team/${game.home_team.id}`}
            className="text-lg sm:text-2xl w-56 sm:w-64 lg:w-fit lg:ms-2 order-1 lg:order-2 text-[#0000EE] hover:underline"
          >
            {game.home_team.full_name}
          </Link>
        </div>
      </div>
      {Object.keys(teams).map((team) => (
        <Boxscore key={teams[team].id} stats={teams[team]} />
      ))}
    </div>
  )
}
export default BoxscorePage
