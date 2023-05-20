import "./globals.css"
import { Roboto } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] })

export const metadata = {
  title: "NBA Stats",
  description: "A web app to navigate through NBA stats  ",
  keywords: "nba, stats, players, games, scoreboard, schedule, statistics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-slate-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
