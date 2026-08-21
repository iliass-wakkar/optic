import { NextResponse } from 'next/server'

export async function GET() {
  const securityTxt = `Contact: mailto:security@example.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: fr, en
Canonical: https://catalogue-optique.vercel.app/.well-known/security.txt
Policy: https://catalogue-optique.vercel.app/security-policy
`

  return new NextResponse(securityTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
