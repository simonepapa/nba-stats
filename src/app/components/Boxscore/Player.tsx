import Link from "next/link"

const Player = ({ stats }: any) => {
  return (
    <tr>
      <td className="px-5 py-1 border-r text-left">
        <Link href={`player/${stats.player.id}`} className="text-[#0000EE]">
          {stats.player.first_name.substring(0, 1) + "."}{" "}
          {stats.player.last_name}{" "}
        </Link>
        <span className="opacity-60 text-xs">{stats.player.position}</span>
      </td>
      <td className="px-5 py-1 text-right">{stats.min}</td>
      <td className="px-5 py-1 text-right">
        {stats.fgm}/{stats.fga}
      </td>
      <td className="px-5 py-1 text-right">
        {stats.fg3m}/{stats.fg3a}
      </td>
      <td className="px-5 py-1 text-right">
        {stats.ftm}/{stats.fta}
      </td>
      <td className="px-5 py-1 text-right">{stats.oreb}</td>
      <td className="px-5 py-1 text-right">{stats.dreb}</td>
      <td className="px-5 py-1 text-right">{stats.reb}</td>
      <td className="px-5 py-1 text-right">{stats.ast}</td>
      <td className="px-5 py-1 text-right">{stats.stl}</td>
      <td className="px-5 py-1 text-right">{stats.blk}</td>
      <td className="px-5 py-1 text-right">{stats.turnover}</td>
      <td className="px-5 py-1 text-right">{stats.pf}</td>
      <td className="px-5 py-1 text-right">{stats.pts}</td>
    </tr>
  )
}
export default Player
