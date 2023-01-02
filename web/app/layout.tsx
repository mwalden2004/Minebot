import { NextSeo } from 'next-seo'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
    <NextSeo
      title="Unleash the Power of Your Minecraft Community with MineBot: The Leading Discord Verification Bot Free"
      description="Welcome to MineBot, the leading Minecraft verification bot for Discord. With powerful automations and a growing list of features, MineBot is here to power up your Minecraft community. Invite MineBot to your Discord server today and join our community to see all that MineBot has to offer. Connect your Minecraft account with ease and unlock the full potential of your server with MineBot."
    />
    <meta name="keywords" content="minecraft,discord,minecraft server,server,bot,minecraft bot,discord bot,minecraft verification,verification,verify,automation,server automation,minecraft automation,community,minecraft community,discord community,discord server,server management,minecraft server magement,management,tools,minecraft tools,discord tools,minecraft resources,resources,discord resources,integration,utility,software,website,free,mine,bot,minebot"></meta>
      </head>
      <body>
        {/*<Header />*/}
        {children}
      </body>
    </html>
  )
}
