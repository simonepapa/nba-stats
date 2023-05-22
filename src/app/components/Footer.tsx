"use client"

import Link from "next/link"
import { BsGithub } from "react-icons/bs"

const Footer = () => {
  return (
    <div className="w-screen mt-5 py-4 px-4 bg-blue-500">
      <div className="w-full flex items-center justify-center">
        <div className="flex space-x-6 mt-0 justify-center">
          <Link href="https://github.com/simonepapa" target="_blank">
            <BsGithub />
          </Link>
        </div>
        <p className="ms-4">
          Made by Simone Papa thanks to{" "}
          <a
            href="https://www.balldontlie.io/"
            target="_blank"
            className="underline"
          >
            balldontlie.io
          </a>{" "}
          API.
        </p>
      </div>
    </div>
  )
}
export default Footer
