interface Props {
  params?: any
}

async function fetchStats(id: string) {
  const stats: { [key: string]: any } = {}
  let season = new Date().getFullYear() - 1 // current season stats are not available
  let stop = false
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

const PlayerPage = async ({ params: { id } }: Props)=> {
  const stats = await fetchStats(id)

  console.log(stats)

  return (
    <div>page</div>
  )
}
export default PlayerPage