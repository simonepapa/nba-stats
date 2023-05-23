import Player from "./Player"

const Boxscore = ({ stats }: any) => {
  return (
    <div className="overflow-x-auto w-screen px-4 max-w-7xl mb-8">
      <table className="w-full table-auto">
        <caption className="text-left font-bold uppercase text-lg mb-2 ms-4">
          {stats.team.full_name}
        </caption>
        <thead>
          <tr className="border-b-2">
            <th className="px-5 border-r text-left w-56">PLAYER</th>
            <th className="px-5 text-right">MIN</th>
            <th className="px-5 text-right">FG</th>
            <th className="px-5 text-right">3PT</th>
            <th className="px-5 text-right">FT</th>
            <th className="px-5 text-right">OREB</th>
            <th className="px-5 text-right">DREB</th>
            <th className="px-5 text-right">REB</th>
            <th className="px-5 text-right">AST</th>
            <th className="px-5 text-right">STL</th>
            <th className="px-5 text-right">BLK</th>
            <th className="px-5 text-right">TO</th>
            <th className="px-5 text-right">PF</th>
            <th className="px-5 text-right">PTS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={1} className="px-5 py-1 font-bold uppercase text-xs border-r">
              Starters
            </td>
          </tr>
          {Object.keys(stats["players"]).map((player, index) =>
            index !== 5 ? (
              <Player
                key={stats["players"][player].id}
                stats={stats["players"][player]}
                index={index}
              />
            ) : (
              <tr key={stats["players"][player].id} className="border-t-2">
                <td
                  colSpan={1}
                  className="px-5 py-1 font-bold uppercase text-xs border-r"
                >
                  Bench
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Boxscore
