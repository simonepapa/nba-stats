const Season = ({ stats }: any) => {
  return (
    <tr>
      <td className="px-3 py-1 text-sm border-r text-right">{stats.season}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.games_played}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.min}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">
        {stats.fgm}-{stats.fga}
      </td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{(stats.fg_pct * 100).toFixed(2)}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">
        {stats.fg3m}-{stats.fg3a}
      </td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{(stats.fg3_pct * 100).toFixed(2)}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">
        {stats.ftm}-{stats.fta}
      </td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{(stats.ft_pct * 100).toFixed(2)}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.oreb}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.dreb}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.reb}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.ast}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.blk}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.stl}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.pf}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.turnover}</td>
      <td className="px-3 py-1 text-sm text-right whitespace-nowrap">{stats.pts}</td>
    </tr>
  )
}
export default Season
