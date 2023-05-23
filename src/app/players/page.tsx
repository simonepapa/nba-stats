"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import PlayerSearch from "../components/Player/PlayerSearch"
import Players from "../components/Player/Players"

const PlayersPage = () => {
  const [players, setPlayers] = useState({})
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchPlayers = async () => {
      let query = ""
      setLoading(true)
      if (
        searchParams.get("search") !== null &&
        searchParams.get("page") !== null
      )
        query = `https://www.balldontlie.io/api/v1/players?per_page=100&page=${searchParams.get(
          "page"
        )}&search=${searchParams.get("search")}`
      else if (
        searchParams.get("page") !== null &&
        searchParams.get("search") === null
      )
        query = `https://www.balldontlie.io/api/v1/players?per_page=100&page=${searchParams.get(
          "page"
        )}}`
      else query = `https://www.balldontlie.io/api/v1/players?per_page=100`

      const res = await fetch(query)
      const data = await res.json()
      setPlayers(data)
      setLoading(false)
    }

    fetchPlayers()
  }, [searchParams])

  return (
    <div className="bg-white rounded-md shadow-md px-4 py-4 w-9/12 mt-4 mx-auto">
      <h1 className="font-bold text-3xl mb-2">NBA Players</h1>
      <PlayerSearch getSearchResults={(results: any) => setPlayers(results)} />
      {!loading ? (
        <Players players={players} />
      ) : (
        <div className="loader mt-8">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  )
}
export default PlayersPage
