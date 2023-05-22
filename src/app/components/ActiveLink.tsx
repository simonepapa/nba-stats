"use client"

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"

const ActiveLink = ({
  children,
  style,
  ...rest
}: { children: React.ReactNode; style?: string } & LinkProps) => {
  const { href } = rest
  const pathName = usePathname()

  const isActive = pathName.startsWith(href.toString())
  return (
    <Link {...rest} className={isActive ? `active ${style}` : `${style}`}>
      {children}
    </Link>
  )
}

export default ActiveLink
