import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { IoLogoGithub } from "react-icons/io"

const Players = ({ players }: any) => {
  const searchParams = useSearchParams()

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-8">
        {players.data &&
          players.data.map((player: any) => {
            return (
              <Link
                key={player.id}
                href={`/player/${player.id}`}
                className="flex items-center bg-slate-100 shadow px-2 py-1 w-fit transition hover:bg-slate-200"
              >
                <IoLogoGithub className="me-4" />
                {player.first_name} {player.last_name}
              </Link>
            )
          })}
      </div>
      {players.meta && players.meta.total_pages > 1 && (
        <div className="flex flex-wrap justify-center mt-8 gap-2">
          {Array.from(Array(players.meta.total_pages), (e, i) => {
            return (
              <Link
                key={i}
                href={`/players?page=${i+1}${searchParams.get("search") !== null ? "&search="+searchParams.get("search") : ""}`}
                className={`${
                  (searchParams.get("page") !== null &&
                  parseInt(searchParams.get("page")!) === i + 1) || (searchParams.get("page") === null && i === 0)
                    ? "font-bold bg-slate-200"
                    : "bg-slate-100 hover:bg-slate-200"
                } px-2 py-1 transition`}
              >
                {i + 1}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
export default Players
