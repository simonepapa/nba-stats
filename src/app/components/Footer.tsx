"use client"

import Link from "next/link"
import { BsGithub } from "react-icons/bs"

const Footer = () => {
  return (
    <div className="w-full mt-5 py-4 px-4 bg-gray-200">
      <div className="w-full flex items-center justify-center">
        <p className="me-4">&copy; {new Date().getFullYear()} Simone Papa</p>
        <div className="flex space-x-6 mt-0 justify-center">
          <Link href="https://github.com/simonepapa" target="_blank">
            <BsGithub />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Footer
