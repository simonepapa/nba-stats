import Link from "next/link"
import ActiveLink from "./ActiveLink"

const Header = () => {
  const today = new Date()

  return (
    <div className="w-screen flex items-center justify-between py-4 px-4 bg-blue-500">
      <Link href="/" className="font-bold text-xl">
        NBA Stats
      </Link>
      <div>
        <ActiveLink
          href={`/schedule/${today.getFullYear()}${(
            "00" + today.getMonth()
          ).slice(-2)}${("00" + today.getDate()).slice(-2)}`}
          style="text-lg me-8"
        >
          Schedule
        </ActiveLink>
        <ActiveLink href="/stats" style="text-lg">
          Stats
        </ActiveLink>
      </div>
    </div>
  )
}
export default Header
