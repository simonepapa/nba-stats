import Link from "next/link"
import ActiveLink from "./ActiveLink"

const Header = () => {
  return (
    <div className="w-screen flex items-center justify-between py-4 px-4 bg-gray-200">
      <Link href="/" className="font-bold text-xl">NBA Stats</Link>
      <div>
        <ActiveLink href="/schedule" style="text-lg me-8">Schedule</ActiveLink>
        <ActiveLink href="/stats" style="text-lg">Stats</ActiveLink>
      </div>
    </div>
  )
}
export default Header