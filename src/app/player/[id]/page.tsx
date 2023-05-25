import StatsTable from "@/app/components/Player/StatsTable"
import Link from "next/link"

async function fetchPlayerInfo(id: string) {
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/players/${id}`,
    {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    }
  )
  const player = await response.json()

  return player
}

async function fetchStats(id: string) {
  const stats: { [key: string]: PlayerSeason } = {}
  let season = new Date().getFullYear() - 1 // current season stats are not available
  let stop = false

  // Using a loop since there is no endpoint to fetch multiple season averages together
  while (stop === false) {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}&season=${season}`,
      {
        next: {
          revalidate: 24 * 60 * 60, // 24 hours
        },
      }
    )
    const season_stats = await response.json()
    if (season_stats.data.length > 0) {
      stats[season_stats.data[0].season] = season_stats.data[0]
    } else {
      stop = true
    }

    season--
  }

  return stats
}

const PlayerPage = async ({ params: { id } }: Props) => {
  const player = await fetchPlayerInfo(id)
  const stats = await fetchStats(id)

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto max-w-7xl">
      <h1 className="font-bold text-3xl mb-2">
        {player.first_name} {player.last_name}
      </h1>
      <p>
        <strong>Team</strong>:{" "}
        <Link
          href={`/team/${player.team.id}`}
          className="text-[#0000EE] hover:underline"
        >
          {player.team.full_name}
        </Link>
      </p>
      <p>
        <strong>Position</strong>: {player.position}
      </p>
      <p>
        <strong>Height</strong>:{" "}
        {player.height_feet !== null && player.height_inches !== null
          ? player.height_feet +
            "' " +
            player.height_inches +
            "''" +
            " (" +
            (player.height_feet * 30.48 + player.height_inches * 2.54).toFixed(
              1
            ) +
            " cm)"
          : "//"}
      </p>
      <p>
        <strong>Weight</strong>:{" "}
        {player.weight_pounds !== null
          ? player.weight_pounds +
            " lbs" +
            " (" +
            (player.weight_pounds / 2.205).toFixed(1) +
            " kg)"
          : "//"}
      </p>
      <StatsTable stats={stats} />
    </div>
  )
}
export default PlayerPage
