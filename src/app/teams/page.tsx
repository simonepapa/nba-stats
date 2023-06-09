import Link from "next/link"
import { IoLogoGithub } from "react-icons/io"

async function fetchTeams() {
  const teamsByConference: TeamsByConference = {
    east: {
      atlantic: [],
      central: [],
      southeast: [],
    },
    west: {
      southwest: [],
      northwest: [],
      pacific: [],
    },
  }

  const response = await fetch(`https://www.balldontlie.io/api/v1/teams`, {
    next: {
      revalidate: 24 * 60 * 60, // 24 hours
    },
  })
  const teams = await response.json()

  teams.data.forEach((team: Team) => {
    switch (team.division) {
      case "Atlantic":
        teamsByConference["east"]["atlantic"].push(team)
        break
      case "Central":
        teamsByConference["east"]["central"].push(team)
        break
      case "Southeast":
        teamsByConference["east"]["southeast"].push(team)
        break
      case "Southwest":
        teamsByConference["west"]["southwest"].push(team)
        break
      case "Northwest":
        teamsByConference["west"]["northwest"].push(team)
        break
      case "Pacific":
        teamsByConference["west"]["pacific"].push(team)
        break
      default:
        break
    }
  })

  return teamsByConference
}

const TeamsPage = async () => {
  const teams = await fetchTeams()

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-2 w-9/12 mt-4 mx-auto">
      <h1 className="font-bold text-3xl mb-2">NBA Teams</h1>
      <h2 className="font-bold text-xl mb-2">Western Conference</h2>
      <div className="flex flex-wrap">
        {Object.keys(teams["west"]).map((division: string) => {
          return (
            <div key={division} className="flex flex-col items-center me-8">
              <h3 className="uppercase font-bold text-lg mb-2">
                {division.charAt(0).toUpperCase() + division.slice(1)}
              </h3>
              {teams["west"][division].map((team: Team, index: number) => {
                return (
                  <Link
                    key={team.id}
                    href={`/team/${team.id}`}
                    className="flex items-center bg-slate-100 shadow px-4 py-4 w-fit transition hover:bg-slate-200 mb-4"
                  >
                    <IoLogoGithub className="me-4" />
                    {teams["west"][division][index].full_name}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
      <h2 className="font-bold text-xl mb-2 mt-4">Eastern Conference</h2>
      <div className="flex flex-wrap">
        {Object.keys(teams["east"]).map((division: string) => {
          return (
            <div key={division} className="flex flex-col items-center me-8">
              <h3 className="uppercase font-bold text-lg mb-2">
                {division.charAt(0).toUpperCase() + division.slice(1)}
              </h3>
              {teams["east"][division].map((team: Team, index: number) => {
                return (
                  <Link
                    key={team.id}
                    href={`/team/${team.id}`}
                    className="flex items-center bg-slate-100 shadow px-4 py-4 w-fit transition hover:bg-slate-200 mb-4"
                  >
                    <IoLogoGithub className="me-4" />
                    {teams["east"][division][index].full_name}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default TeamsPage
