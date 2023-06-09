import Link from "next/link"

const ScheduleGame = ({game}: any) => {
  return (
    <div className="bg-slate-100 shadow px-4 md:px-8 py-4 mx-auto 2xl:mx-4 mb-8 md:mb-4 flex flex-col md:flex-row md:items-center w-full max-w-xs md:max-w-lg">
      <div className="sm:w-5/6">
        <p className="text-sm mb-2">
          {game.postseason
            ? `${game.season} Playoffs`
            : `${game.season} Regular season`}
        </p>
        <p className="text-sm font-bold uppercase">
          {[
            "1st Qtr",
            "2nd Qtr",
            "3rd Qtr",
            "4th Qtr Qtr",
            "Halftime",
            "Final",
          ].includes(game.status)
            ? game.status
            : ("00" + new Date(game.status).getHours().toString()).slice(-2) +
              ":" +
              ("00" + new Date(game.status).getMinutes().toString()).slice(-2)}
        </p>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Link
              href={`/team/${game.visitor_team.id}`}
              className="text-lg w-56 text-[#0000EE] hover:underline"
            >
              {game.visitor_team.full_name}
            </Link>
            <p
              className={`${
                game.visitor_team_score !== null && game.home_team_score !== null && game.visitor_team_score > game.home_team_score &&
                game.status === "Final"
                  ? "font-bold"
                  : ""
              } text-lg`}
            >
              {game.visitor_team_score}
            </p>
          </div>
          <div className="flex items-center">
            <Link
              href={`/team/${game.home_team.id}`}
              className="text-lg w-56 text-[#0000EE] hover:underline"
            >
              {game.home_team.full_name}
            </Link>
            <p
              className={`${
                game.visitor_team_score !== null && game.home_team_score !== null && game.visitor_team_score < game.home_team_score &&
                game.status === "Final"
                  ? "font-bold"
                  : ""
              } text-lg`}
            >
              {game.home_team_score}
            </p>
          </div>
        </div>
      </div>
      {[
        "1st Qtr",
        "2nd Qtr",
        "3rd Qtr",
        "4th Qtr Qtr",
        "Halftime",
        "Final",
      ].includes(game.status) && (
        <Link
          href={`/boxscore/${game.id}`}
          className="w-fit whitespace-nowrap text-white uppercase rounded-lg px-4 py-2 bg-blue-500 hover:cursor-pointer hover:bg-blue-700 transition mt-4 md:mt-0 mx-auto md:ms-4 md:me-0"
        >
          Box Score
        </Link>
      )}
    </div>
  )
}
export default ScheduleGame
