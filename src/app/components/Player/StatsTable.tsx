import Season from "./Season"

const StatsTable = ({ stats }: any) => {
  console.log(stats)
  return (
    <div className="overflow-x-auto max-w-7xl mt-4">
      <table className="w-full table-auto">
        <caption className="text-left font-bold uppercase text-lg mb-2 ms-4">
          Regular Season
        </caption>
        <thead>
          <tr className="border-b-2">
            <th className="px-3 text-sm border-r text-right">SEASON</th>
            <th className="px-3 text-sm text-right">GP</th>
            <th className="px-3 text-sm text-right">MIN</th>
            <th className="px-3 text-sm text-right">FG</th>
            <th className="px-3 text-sm text-right">FG%</th>
            <th className="px-3 text-sm text-right">3PT</th>
            <th className="px-3 text-sm text-right">3P%</th>
            <th className="px-3 text-sm text-right">FT</th>
            <th className="px-3 text-sm text-right">FT%</th>
            <th className="px-3 text-sm text-right">OR</th>
            <th className="px-3 text-sm text-right">DR</th>
            <th className="px-3 text-sm text-right">REB</th>
            <th className="px-3 text-sm text-right">AST</th>
            <th className="px-3 text-sm text-right">BLK</th>
            <th className="px-3 text-sm text-right">STL</th>
            <th className="px-3 text-sm text-right">PF</th>
            <th className="px-3 text-sm text-right">TO</th>
            <th className="px-3 text-sm text-right">PTS</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((player) => (
            <Season key={stats.season} stats={stats[player]} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default StatsTable
