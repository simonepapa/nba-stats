"use client"

import { useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

const PlayerSearch = ({ getSearchResults }: any) => {
  const [query, setQuery] = useState("")

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams() as any

  const handleSubmit = async (e: any) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const currentSearchParams = new URLSearchParams(searchParams)

    e.preventDefault()

    const res = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${query}&per_page=100`
    )
    const players = await res.json()
    if (query !== "") {
      currentSearchParams.set("search", query)
      currentSearchParams.set("page", "1")
      router.push(`${pathname}?page=1&search=${query}`)
    } else {
      currentSearchParams.delete("search")
      currentSearchParams.delete("page")
      router.push(`${pathname}`)
    }

    getSearchResults(players)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center items-center"
    >
      <input
        type="text"
        className="rounded-lg border border-black/50 px-4 py-1 mb-4 sm:mb-0 sm:me-4 w-full sm:max-w-xl"
        placeholder="Search Players..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button
        className="w-fit whitespace-nowrap text-white uppercase rounded-lg px-4 py-1 bg-blue-500 hover:cursor-pointer hover:bg-blue-700 transition"
        type="submit"
      >
        Search
      </button>
    </form>
  )
}
export default PlayerSearch
