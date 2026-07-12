import * as React from "react"
import { Link } from "react-router-dom"

interface AuthFooterProps {
  text: string
  linkText: string
  href: string
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <p className="mt-8 text-center text-sm text-text-muted">
      {text}{" "}
      <Link to={href} className="font-medium text-primary hover:underline transition-colors hover:text-primary-600">
        {linkText}
      </Link>
    </p>
  )
}
