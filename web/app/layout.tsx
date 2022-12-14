import './globals.css'
import Header from '../components/header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/*<Header />*/}
        {children}
      </body>
    </html>
  )
}
